// Interface for the config
export interface ConfigProps {
    // App Defaults
    application_name?: string;
    application_tag_line?: string;
    default_profile_picture?: string;
    JWT_Key?: string;
    default_channel_id?: string;

    // Network Variables
    mode?: string;
    baseUrl?: string;
    DEV_BASE_URL?: string;
    PROD_BASE_URL?: string;
    api_version?: string;

    // Main Prefixes Endpoints
    auth_route?: string;
    requirements_route?: string;
    raisedhands_route?: string;
    chats_route?: string;
    otp_route?: string;
    buysell_route?: string;
    lostfound_route?: string;

    // Auth Endpoints
    editProfile?: string;
    login?: string;
    change_password?: string;
    google_login?: string;
    register?: string;
    logout?: string;
    toggle_push_notif?: string;
    send_email_verify_otp?: string;
    send_password_reset_otp?: string;
    reset_password?: string;

    // BuySell Endpoints
    create_buy_sell?: string;
    edit_buysell_item?: string;
    get_own_buy_sell?: string;
    delete_buy_sell?: string;
    get_buysell_details?: string;
    get_buy_sell_feed?: string;
    search_buy_sell?: string;

    // Lost Found Endpoints
    create_lost_found?: string;
    get_own_lostfound?: string;
    delete_lostfound?: string;
    get_lostfound_details?: string;
    edit_lostfound?: string;
    get_lostfound_feed?: string;
    search_lostfound?: string;

    // OTP Endpoints
    verify_otp?: string;

    // RaisedHands Endpoints
    raise_a_hand?: string;
    get_raisedHands_list?: string;
    accept_raised_hand?: string;
    reject_raised_hand?: string;

    // Requirements Endpoints
    new_requirement?: string;
    get_own_requirements?: string;
    edit_requirement?: string;
    delete_requirement?: string;
    requirement_feed?: string;

    // google sign in variables
    googleClientID?: string;

    // Any other variables
    [key: string]: any;
}