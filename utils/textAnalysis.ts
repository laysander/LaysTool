export interface Keyword {
    word: string;
    count: number;
    percentage: string;
}

export interface TextAnalysis {
    text: string;
    characters: number;
    words: number;
    sentences: number;
    paragraphs: number;
    readingTime: string;
    avgWordLength: number;
    avgSentenceLength: number;
    keywords: Keyword[];
}

// A list of common English stop words.
const stopWords = new Set([
    "a", "about", "above", "after", "again", "against", "all", "am", "an", "and", "any", "are", "aren't", "as", "at",
    "be", "because", "been", "before", "being", "below", "between", "both", "but", "by", "can't", "cannot", "could",
    "couldn't", "did", "didn't", "do", "does", "doesn't", "doing", "don't", "down", "during", "each", "few", "for", "from",
    "further", "had", "hadn't", "has", "hasn't", "have", "haven't", "having", "he", "he'd", "he'll", "he's", "her",
    "here", "here's", "hers", "herself", "him", "himself", "his", "how", "how's", "i", "i'd", "i'll", "i'm", "i've",
    "if", "in", "into", "is", "isn't", "it", "it's", "its", "itself", "let's", "me", "more", "most", "mustn't", "my",
    "myself", "no", "nor", "not", "of", "off", "on", "once", "only", "or", "other", "ought", "our", "ours", "ourselves",
    "out", "over", "own", "same", "shan't", "she", "she'd", "she'll", "she's", "should", "shouldn't", "so", "some", "such",
    "than", "that", "that's", "the", "their", "theirs", "them", "themselves", "then", "there", "there's", "these", "they",
    "they'd", "they'll", "they're", "they've", "this", "those", "through", "to", "too", "under", "until", "up", "very",
    "was", "wasn't", "we", "we'd", "we'll", "we're", "we've", "were", "weren't", "what", "what's", "when", "when's",
    "where", "where's", "which", "while", "who", "who's", "whom", "why", "why's", "with", "won't", "would", "wouldn't",
    "you", "you'd", "you'll", "you're", "you've", "your", "yours", "yourself", "yourselves"
]);

const cleanTextForAnalysis = (text: string): string => {
    let cleanText = text;

    // For markdown links like [text](url), count "text" as words but not the URL part.
    // This regex replaces the entire link with just its text content.
    cleanText = cleanText.replace(/\[([^\]]+)\]\((?:https?:\/\/)?[^)]+\)/g, '$1');

    // For markdown images like ![alt](src), remove them entirely as they are not part of the prose.
    cleanText = cleanText.replace(/!\[[^\]]*\]\([^)]+\)/g, '');
    
    return cleanText;
}

const countWords = (text: string): number => {
    if (!text.trim()) return 0;
    
    const cleanText = cleanTextForAnalysis(text);

    // A robust regex to find words, accounting for international characters,
    // and allowing hyphens, apostrophes, and periods within words (e.g., "garis-garis", "don't", "file.name").
    // \p{L} = Any Unicode letter
    // \p{N} = Any Unicode number
    // The 'u' flag is for Unicode support.
    const wordRegex = /[\p{L}\p{N}_]+(?:['.-][\p{L}\p{N}_]+)*/gu;
    const words = cleanText.match(wordRegex);

    return words ? words.length : 0;
};


const countSentences = (text: string): number => {
    if (!text.trim()) return 0;
    
    const cleanText = cleanTextForAnalysis(text);

    // This regex is a compromise to handle common cases without being overly complex.
    // It looks for sentence-ending punctuation followed by a space and an uppercase letter, or the end of the text.
    // It is applied to the cleaned text to avoid incorrect splits due to URLs.
    const sentences = cleanText.split(/[.!?…]+(?=\s+[A-ZÀ-ÿ]|\s*$)/g).filter(s => s.trim().length > 0);
    return sentences.length > 0 ? sentences.length : (cleanText.trim().length > 0 ? 1 : 0);
}

const countParagraphs = (text: string): number => {
    if (!text.trim()) return 0;
    // Paragraphs are defined by one or more newline characters.
    return text.split(/\n+/).filter(p => p.trim() !== '').length;
}

const calculateReadingTime = (wordCount: number): string => {
    if (wordCount === 0) return '0 min';
    const wpm = 225;
    const minutes = Math.ceil(wordCount / wpm);
    if (minutes === 1) return '1 min read';
    return `${minutes} min read`;
}

const getKeywordDensity = (text: string, totalWords: number): Keyword[] => {
    if (totalWords === 0) return [];

    const words = text.toLowerCase().match(/[\p{L}\p{N}_]+/gu) || [];
    const frequency: { [key: string]: number } = {};

    for (const word of words) {
        if (!stopWords.has(word) && isNaN(Number(word))) {
            frequency[word] = (frequency[word] || 0) + 1;
        }
    }

    return Object.entries(frequency)
        .sort(([, a], [, b]) => b - a)
        .slice(0, 10)
        .map(([word, count]) => ({
            word,
            count,
            percentage: ((count / totalWords) * 100).toFixed(2)
        }));
}

export const analyzeText = (text: string): TextAnalysis => {
    // Character count is based on the raw, original text.
    const characters = text.length;
    
    // All other analysis is performed on a cleaned version of the text.
    const words = countWords(text);
    const sentences = countSentences(text);
    const paragraphs = countParagraphs(text);
    const cleanText = cleanTextForAnalysis(text);

    const charOnlyText = cleanText.replace(/\s/g, '');
    const avgWordLength = words > 0 ? parseFloat((charOnlyText.length / words).toFixed(1)) : 0;
    const avgSentenceLength = sentences > 0 ? parseFloat((words / sentences).toFixed(1)) : 0;

    return {
        text,
        characters,
        words,
        sentences,
        paragraphs,
        readingTime: calculateReadingTime(words),
        avgWordLength,
        avgSentenceLength,
        keywords: getKeywordDensity(cleanText, words)
    };
};