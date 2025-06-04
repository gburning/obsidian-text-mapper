export interface Theme {
    /**
     * Function used to get defintions for the theme.
     * The definitions are used to define the tiles, icons, and other elements of the theme.
     * The definitions should be in the format of a string array, where each string is a definition.
     */
    getDefinitions: () => string[];
}
