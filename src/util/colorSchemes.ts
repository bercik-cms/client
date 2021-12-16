import mermaid from 'mermaid';

const defaultTheme = 'gruvbox_light';

const colorschemes: { [name: string]: { [color: string]: string } } = {
    gruvbox_light: {
        bg0: '#f9f5d7',
        bg1: '#ebdbb2',
        bg2: '#d5c4a1',

        fg0: '#282828',
        fg1: '#3c3836',
        fg2: '#504945',

        red: '#cc241d',
        green: '#98971a',
        yellow: '#d79921',
        blue: '#458588',
        purple: '#b16286',
        aqua: '#689d6a',
        gray: '#7c6f64',
        orange: '#d65d0e',
    },
    gruvbox_dark: {
        bg0: '#1d2021',
        bg1: '#282828',
        bg2: '#3c3836',

        fg0: '#fbf1c7',
        fg1: '#ebdbb2',
        fg2: '#d5c4a1',

        red: '#cc241d',
        green: '#98971a',
        yellow: '#d79921',
        blue: '#458588',
        purple: '#b16286',
        aqua: '#689d6a',
        gray: '#a89984',
        orange: '#d65d0e',
    },
};

export function isThemeDark() {
    let current = getTheme() || defaultTheme;
    return current.indexOf('dark') !== -1;
}

export function toggleTheme() {
    let current = getTheme() || defaultTheme;
    let newTheme: string;

    if (current.indexOf('light') !== -1) {
        newTheme = current.replace('light', 'dark');
    } else {
        newTheme = current.replace('dark', 'light');
    }

    setTheme(newTheme);
}

function getTheme() {
    return localStorage.getItem('colorscheme');
}

export function loadTheme() {
    setTheme(getTheme() || defaultTheme);
}

export function setTheme(scheme: string) {
    if (Object.keys(colorschemes).indexOf(scheme) === -1) {
        console.error(`Colorscheme ${scheme} NOT DEFINED!`);
        return;
    }

    for (let [key, value] of Object.entries(colorschemes[scheme])) {
        document.documentElement.style.setProperty(`--${key}`, value as string);
    }

    let mermaidFilter = '';
    if (scheme.indexOf('dark') !== -1) mermaidFilter = 'invert(1)';
    document.documentElement.style.setProperty(
        '--mermaid-filter',
        mermaidFilter
    );

    localStorage.setItem('colorscheme', scheme);
}

