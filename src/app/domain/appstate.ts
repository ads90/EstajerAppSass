export interface AppState {
    preset?: string;
    primary?: string;
    surface?: string;
    darkTheme?: boolean;
    menuActive?: boolean;
    designerKey?: string;
    RTL?: boolean;
}
export const DEFAULT_APP_STATE: AppState = {
    preset: '',
    primary: '#000000',
    surface: '#FFFFFF',
    darkTheme: false,
    menuActive: false,
    designerKey: '',
    RTL: false,
  };