export const langId2Code = (langId: number): 'en' | 'ru' => {
    const map: { [key in number]: 'en' | 'ru' } = {
        1: 'ru',
        2: 'en'
    }

    return map[langId];
}