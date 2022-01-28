// Packages Imports
import Animated from "react-native-reanimated"
import { ColorValue, GestureResponderEvent, ImageStyle, KeyboardTypeOptions, OpaqueColorValue, StatusBarStyle, StyleProp, TextProps, TextStyle, ViewStyle } from "react-native";
import { AVPlaybackSource, AVPlaybackStatusToSet } from "expo-av/build/AV.types";

// AnimatedView Props interface
export interface AnimatedViewProps extends Animated.AnimateProps<ViewStyle> {
    children: React.ReactNode;
    style?: StyleProp<ViewStyle>;
}

// AnimatedText Props interface
export interface AnimatedTextProps
    extends AppTextProps,
    Animated.AnimateProps<any> { }

// AppButtonProps interface
export interface AppButtonProps {
    title?: string;
    onPress?: () => void;
    backgroundColor?: any;
    height?: number;
    width?: number | string;
    borderRadius?: number;
    textColor?: ColorValue
    loading?: boolean;
    containerStyle?: StyleProp<ViewStyle>;
    disabled?: boolean;
    mode?: "outlined" | "contained" | "text";
    uppercase?: boolean;
    labelStyle?: StyleProp<TextStyle>;
    marginLeft?: number;
    marginRight?: number;
    marginTop?: number;
    marginBottom?: number;
}

// AppSubmitButton interface
export interface AppSubmitButtonProps extends AppButtonProps {
    CustomButton?: React.ComponentType<any>;
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

// AppFormField interface
export interface AppFormFieldProps extends AppTextInputProps {
    title: string;
    controlled?: boolean;
}


// AppHeaderBar interface
export interface AppHeaderBarProps {
    title?: string;
    onIconPress?: () => void;
    backgroundColor?: ColorValue;
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
    showBorder?: boolean;
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
    labelSize?: number;
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
    multiline?: boolean;
    disabled?: boolean;
    showError?: boolean;
    maxLength?: number;
}

// AppLoading interface
export interface AppLoadingProps {
    loadingText?: string;
    loadingColor?: ColorValue;
    loadingSize?: number;
    loading?: boolean;
    style?: StyleProp<ViewStyle>;
}

// Interface for AppModalProps
export interface AppModalProps {
    children?: React.ReactNode;
    isVisible?: boolean;
    style?: any;
    backdropColor?: string;
    backdropOpacity?: number;
    coverScreen?: boolean;
    hasBackdrop?: boolean;
    onBackButtonPress?: () => void;
    onDismiss?: () => void;
    useNativeDriver?: boolean;
    backgroundColor?: string;
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
    loading?: boolean;
    style?: StyleProp<TextStyle>
}

// ChatKeyboardProps interface
export interface ChatKeyboardProps {
    onChangeText?: (text: string) => void;
    onSubmit?: () => void;
    value?: string;
    placeholder?: string;
    containerStyle?: StyleProp<ViewStyle>;
    onPickPress?: () => void;
    onCameraPress?: () => void;
    showCameraIcon?: boolean;
    showFileIcon?: boolean;
    loading?: boolean;
    backgroundColor?: ColorValue;
    color?: ColorValue;
}

// Developers Props interface
export interface DeveloperCardProps {
    _id?: string | number;
    name?: string;
    profile_picture?: string;
    linkedin_url?: string;
    github_url?: string;
    email_address?: string;
}

// FileModalProps interface
export interface FileModalProps extends AppModalProps {
    // File Props
    uri?: string;
    mimeType?: string;

    // Caption Props
    text?: string;
    headerTitle?: string;

    // Keyboard Props
    onChangeText?: (text: string) => void;
    onSubmit?: () => void;
    placeholder?: string;
    loading?: boolean;
    value?: string;
    showKeyboard?: boolean;

    // Children
    children?: any;
}

// MenuCard Props interface
export interface MenuCardProps {
    // Menu Card Props
    showMenu?: boolean;
    name?: string;
    onPress?: () => void;
    backgroundColor?: ColorValue;
    color?: ColorValue;
    containerStyle?: StyleProp<ViewStyle>;
    textStyle?: StyleProp<TextStyle>;
    textContainerStyle?: StyleProp<ViewStyle>;
    borderBottomColor?: ColorValue;
    borderBottomWidth?: number;

    // Prefix Icon
    prefixIconProps?: AppIconTypes;
    showPrefixIcon?: boolean;
    customPrefixIcon?: React.ReactNode;

    // Suffix Icon
    suffixIconProps?: AppIconTypes;
    showSuffixIcon?: boolean;
    customSuffixIcon?: React.ReactNode;
}

// Message Props interface
export interface MessageProps {
    _id?: string | number;
    room_id?: string;
    message?: string;
    sender_id?: string;
    message_type?: string;
    reciever_id?: string;
    message_datetime?: string;
    read?: boolean;
    onMessagePress?: () => void;
    upper_date?: any;
    message_file?: {
        _id?: string,
        public_id?: string,
        mimeType?: string,
        uri?: string,
        height?: Number,
        width?: Number,
    };
}

// export MessageCardProps
export interface MessageCardProps extends MessageProps {
    sender_id?: string;
    onMessagePress?: () => void;
    upper_date?: string;
    [key: string]: any;
}

// Send Message Props
export interface SendMessageProps extends MessageProps {
    delivered?: boolean;
}

// PickerItem Props
export interface PickerItemProps {
    label: string;
    _id?: string | number;
    onPress?: () => void;
    value?: string;
    iconProps?: AppIconTypes;
}

export interface PickerProps {
    items: Array<PickerItemProps>;
    onItemPress?: (item: PickerItemProps) => void;
    pickerTitle?: string;
    selected?: PickerItemProps;
    error?: string;
    containerStyle?: StyleProp<ViewStyle>;
}

// RoundIconButtonProps interface
export interface RoundIconButtonProps extends AppIconTypes {
    style?: StyleProp<ViewStyle>;
}

// RippleIconButtonProps interface
export interface RippleIconButtonProps extends AppIconTypes {
    style?: StyleProp<ViewStyle>;
    onPress?: () => void;
    rippleStyle?: StyleProp<ViewStyle>;
}

// audio player hook
export interface AudioPlayerHookProps {
    [key: string]: any;
}

export interface VideoPlayerHookProps {
    AnimateTo?: any,
    loadOnMount?: boolean,
    autoPlay?: boolean,
    source?: AVPlaybackSource | null,
    isLooping?: boolean,
    otherLoadProps?: AVPlaybackStatusToSet
};