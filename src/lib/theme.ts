export interface Theme {
    /**
     * The name of the theme, used for display purposes.
     */
    displayName: string;

    /**
     * The unique identifier for the theme, will be used to prefix "names" in theme definitions.
     * May only contain ascii letters ([A-Za-z]), digits ([0-9]), dashes (-), and underscores (_).
     * @example If the id is "myTheme", then definitions will be prefixed with "myTheme-".
     */
    id: string;

    /**
     * Function used to get defintions for the theme.
     * The definitions are used to define the tiles, icons, and other elements of the theme.
     * The definitions should be in the format of a string array, where each string is a definition.
     */
    getDefinitions: () => string[];
}
