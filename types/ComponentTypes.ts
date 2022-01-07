// Packages Imports
import { ColorValue, GestureResponderEvent, ImageStyle, KeyboardTypeOptions, StatusBarStyle, StyleProp, TextProps, TextStyle, ViewStyle } from "react-native";

// AppButtonProps interface
export interface AppButtonProps {
    title?: string;
    onPress?: () => void;
    backgroundColor?: ColorValue
    height?: number;
    width?: number | string;
    borderRadius?: number;
    textColor?: ColorValue
    loading?: boolean;
    containerStyle?: StyleProp<ViewStyle>;
}

// AppDialog interface
export interface AppDialogProps {
    visible: boolean;
    hideDialog?: () => void;
    title?: string;
    children?: React.ReactNode;
    onDonePress?: () => void;
    okLabel?: string;
}

// AppHeaderBar interface
export interface AppHeaderBarProps {
    title?: string;
    onIconPress?: () => void;
}

// AppImage interface
export interface AppImageProps {
    uri?: string;
    style?: StyleProp<ImageStyle>;
    resizeMode?: "cover" | "contain" | "stretch" | "repeat" | "center";
    onPress?: () => void;
    borderRadius?: number;
    borderColor?: ColorValue;
    borderWidth?: number;
}

// AppRow interface
export interface AppRowProps {
    children?: any;
    style?: StyleProp<ViewStyle>;
    justifyContent?: "flex-start" | "flex-end" | "center" | "space-between" | "space-around";
    alignItems?: "flex-start" | "flex-end" | "center" | "stretch" | "baseline";
    marginLeft?: number;
    marginRight?: number;
    marginTop?: number;
    marginBottom?: number;
    onPress?: (event: GestureResponderEvent) => void;
}

// AppRadioButton interface
export interface AppRadioButtonProps {
    status?: boolean;
    label?: string;
    onPress?: () => void;
    labelComponent?: React.ReactNode;
    disabled?: boolean;
    containerStyle?: StyleProp<ViewStyle>;
    error?: string;
}

// AppText interface
export interface AppTextProps {
    text?: string;
    style?: StyleProp<TextStyle>;
    color?: ColorValue;
    textProps?: TextProps;
    size?: number;
    family?: string;
    marginLeft?: number;
    marginRight?: number;
    marginTop?: number;
    marginBottom?: number;
    onPress?: (event: GestureResponderEvent) => void;
}

// AppTextInputProps interface
export interface AppTextInputProps extends AppHelperTextProps {
    placeholder?: string;
    placeholderTextColor?: ColorValue;
    label?: string;
    borderRadius?: number;
    onChangeText?: (text: string) => void;
    value?: string;
    secureTextEntry?: boolean;
    backgroundColor?: ColorValue
    containerStyle?: StyleProp<ViewStyle>;
    textInputStyle?: StyleProp<TextStyle>;
    mode?: "flat" | "outlined";
    onBlur?: () => void;
    keyboardType?: KeyboardTypeOptions;
    error?: string;
    leftIcon?: React.ReactNode
    rightIcon?: React.ReactNode
}

// AppLoading interface
export interface AppLoadingProps {
    loadingText?: string;
    loadingColor?: ColorValue;
    loadingSize?: number;
    loading?: boolean;
    style?: StyleProp<ViewStyle>;
}

// Container Props interface
export interface AppContainerProps {
    children?: any
    style?: StyleProp<ViewStyle>
    backgroundColor?: ColorValue
    statusBarBackgroundColor?: ColorValue
    statusBarStyle?: StatusBarStyle
}

// AppHelperTextProps interface
export interface AppHelperTextProps {
    text?: string;
    helperTextType?: "error" | "info";
    helperTextPadding?: "none" | "normal"
    helperTextStyle?: StyleProp<TextStyle>;
    helperTextColor?: ColorValue;
}

// AppIcon props interface
export interface AppIconTypes {
    name?: any;
    family?: string;
    color?: ColorValue
    size?: number
    onPress?: ((event: GestureResponderEvent) => void) | any
    marginLeft?: number;
    marginRight?: number;
    marginTop?: number;
    marginBottom?: number;
    style?: StyleProp<TextStyle>
}
