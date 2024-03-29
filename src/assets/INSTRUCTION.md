# ekyc-web-sdk

## Introduction

This project is developed by FCI Team. This is a project to build a framework that provides the
function of electronic know your customer (eKYC) on four kinds of Vietnam identity documents as
identity card (with and without chip), driving lisence and passport.

App demo: https://ekyc.fpt.ai/sdk/demo

* [Installation](#installation)

## Installation

1. Add script and css files to the header
```javascript
<script type="module" src="sdk.js"></script>
<link rel="stylesheet" href="sdk.css"/>
```

2. Add asset folder to your public/static folder

Your assets folder may look like this: 
```javascript
public/
    |
    +--fci-assets/
        |
        +--animations/
        +--images/
        +--models/
```

3. Default theme config
```javascript
/**
 *
 * Customize and download theme config from Portal
 *
 * - [EKYC Portal](https://ekyc.fpt.ai/sdk/wizard)
 */
ekyc.setTheme({
    "color": {
        "fci_main_color": "#005bd2",
        "fci_doc_version": "#636079",
        "fci_doc_title_color": "#000000",
        "fci_suggestion_color": "#616161",
        "fci_bg_front_color": "#ff9800",
        "fci_doc_front_color": "#FFFFFF",
        "fci_nfc_title_color": "#636079",
        "fci_nfc_message_color": "#393552",
        "fci_nfc_cancel_color": "#76767c",
        "fci_nfc_bg_cancel_color": "#F3F1FE",
        "fci_live_guide_color": "#ffffff",
        "fci_live_bg_guide_color": "#FF9800",
        "fci_live_err_title_color": "#000000",
        "fci_live_err_message_color": "#d84647",
        "fci_live_err_content_color": "#d84647",
        "fci_live_err_bg_content_color": "#ffebee",
    },
    "text": {
        "en": {
            "please_choose_kyc": "Please select type of eKYC",
            "id_result_title": "Identity card",
            "passport_result_title": "Passport",
            "driver_license_result_title": "Driver's license",
            "kyc_video_title": "Record video of face",
            "kyc_video_suggestion1": "Please keep your face in the recording area",
            "kyc_account_verification_title": "Verify account",
            "kyc_ready_to_scan": "Ready to scan",
            "kyc_nfc_title": "Put your phone over the document",
            "let_s_try_again": "Let's try that again",
            "kyc_no_success": "Ekyc failed",
            "kyc_try_again": "Try again"
        },
        "vi": {
            "please_choose_kyc": "Vui lòng chọn loại eKYC",
            "id_result_title": "Thẻ căn cước công dân",
            "passport_result_title": "Hộ chiếu",
            "driver_license_result_title": "Giấy phép lái xe",
            "kyc_video_title": "Quay video khuôn mặt",
            "kyc_video_suggestion1": "Xin hãy giữ khuôn mặt nằm trong vùng quay",
            "kyc_account_verification_title": "Xác thực tài khoản",
            "kyc_ready_to_scan": "Sẵn sàng để quét",
            "kyc_nfc_title": "Đặt điện thoại của bạn lên trên chip phía sau CCCD",
            "let_s_try_again": "Hãy Thử Lại",
            "kyc_no_success": "Ekyc thất bại",
            "kyc_try_again": "Thử Lại"
        }
    }
})
```
4. Run SDK
```javascript
type OptionType = {
    /**
     * Config endpoint url and headers for 'init session' API.
     * type EndpointType = {
     *      url: string,
     *      headers: Record<string, string>
     * }
     */
    endpoint_init_session: EndpointType,
     /**
     * Config endpoint url and headers for 'ocr' API.
     * default form_names is ["files", "files"]
     * type EndpointType = {
     *      url: string,
     *      headers: Record<string, string>,
     *      form_names?: [string, string]
     * }
     */
    endpoint_ocr: EndpointType,
     /**
     * Config endpoint url and headers for 'liveness' API.
     * default form_names is ["cmnd", "video"]
     * type EndpointType = {
     *      url: string,
     *      headers: Record<string, string>,
     *      form_names?: [string, string]
     * }
     */
    endpoint_liveness: EndpointType,
  
    /**
     * Set extra ID for each session
     */
    client_id?: string,
    /**
     * Set SDK model language
     * Default: vn
     * 
     * vn: Vietnam
     * fil: Philippines
     * idn: Indonesia
     */ 
    model_language?: "vn" | "fil" | "idn"
    /*
     * Set language on UI
     *
     * default: vi
     * vi: Vietnamese
     * en: English
     */
    lang?: "en" | "vi",
    /*
     * Selectable documents on UI
     * default: ['idr', 'passport', 'dlr']
     * 
     * idr: ID document
     * passport: Passport document
     * dlr: driver license document
     */
    selectable_documents?: Array<'idr' | 'passport' | 'dlr'>,
     /*
     * Set liveness session id, SDK will start with liveness only
     * Prerequisite: session id with completed OCR.
     * 
     * default: undefined
     */
    liveness_session_id?: string,
    /*
     * Callback when results are available
     *
     * type SdkResult = {
     *      "ocrResult": Record<string, string>,
     *      "livenessFiles": File[],
     *      "livenessResult": Record<string, Record<string, string>>
     *      "ocrFiles": File[],
     * }
     */
    on_result?: (data: SdkResult) => void,
    /*
     * Type of upload image in OCR
     *
     * default: "capture"
     * capture: open webcam and capture photo of document
     * upload: select an image file from your device
     */
    upload_type?: "capture" | "upload",
    /*
     * Parent element of SDK, default 'null' will append to document.body
     *
     * default: null
     */
    parent_element?: HTMLElement | null,
    /*
     * Base path for assets
     *
     * default: window.origin
     */
    asset_base_path?: string,
}

function ekyc.init(options: OptionType)
```
5. Close SDK
```javascript
function ekyc.dispose(): Promise<boolean>
```

6. Working example
```javascript
<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible"
        content="IE=edge" />
    <meta name="viewport"
        content="width=device-width,initial-scale=1,shrink-to-fit=no" />
    <title>SDK - EKYC</title>
    <script type="module"
        src="sdk.js"></script>
    <link rel="stylesheet"
        href="sdk.css" />
</head>
<body>
    <button id="init_btn">Init sdk</button>
    <script>
        function initSdk() {
            if (!window.ekyc) return;
             window.ekyc.setTheme({
                "color": {
                    "fci_main_color": "#005bd2",
                    "fci_doc_version": "#636079",
                    "fci_doc_title_color": "#000000",
                    "fci_suggestion_color": "#616161",
                    "fci_bg_front_color": "#ff9800",
                    "fci_doc_front_color": "#FFFFFF",
                    "fci_nfc_title_color": "#636079",
                    "fci_nfc_message_color": "#393552",
                    "fci_nfc_cancel_color": "#76767c",
                    "fci_nfc_bg_cancel_color": "#F3F1FE",
                    "fci_live_guide_color": "#ffffff",
                    "fci_live_bg_guide_color": "#FF9800",
                    "fci_live_err_title_color": "#000000",
                    "fci_live_err_message_color": "#d84647",
                    "fci_live_err_content_color": "#d84647",
                    "fci_live_err_bg_content_color": "#ffebee",
                },
                "text": {
                    "en": {
                        "please_choose_kyc": "Please select type of eKYC",
                        "id_result_title": "Identity card",
                        "passport_result_title": "Passport",
                        "driver_license_result_title": "Driver's license",
                        "kyc_video_title": "Record video of face",
                        "kyc_video_suggestion1": "Please keep your face in the recording area",
                        "kyc_account_verification_title": "Verify account",
                        "kyc_ready_to_scan": "Ready to scan",
                        "kyc_nfc_title": "Put your phone over the document",
                        "let_s_try_again": "Let's try that again",
                        "kyc_no_success": "Ekyc failed",
                        "kyc_try_again": "Try again"
                    },
                    "vi": {
                        "please_choose_kyc": "Vui lòng chọn loại eKYC",
                        "id_result_title": "Thẻ căn cước công dân",
                        "passport_result_title": "Hộ chiếu",
                        "driver_license_result_title": "Giấy phép lái xe",
                        "kyc_video_title": "Quay video khuôn mặt",
                        "kyc_video_suggestion1": "Xin hãy giữ khuôn mặt nằm trong vùng quay",
                        "kyc_account_verification_title": "Xác thực tài khoản",
                        "kyc_ready_to_scan": "Sẵn sàng để quét",
                        "kyc_nfc_title": "Đặt điện thoại của bạn lên trên chip phía sau CCCD",
                        "let_s_try_again": "Hãy Thử Lại",
                        "kyc_no_success": "Ekyc thất bại",
                        "kyc_try_again": "Thử Lại"
                    }
                }
            })

            const btn = document.getElementById('init_btn');
            if (!btn) return;
            const bearerToken = `Bearer ******`;
            btn.onclick = () => {
                window.ekyc.init({
                    lang: 'vi',
                    endpoint_init_session: {
                        url: "******", // your proxy server
                        headers: {
                            Authorization: bearerToken
                        },
                    },
                    endpoint_ocr: {
                        url: "******", // your proxy server
                        headers: {
                            Authorization: bearerToken
                        },
                    },
                    endpoint_liveness: {
                        url: "******", // your proxy server
                        headers: {
                            Authorization: bearerToken
                        },
                    },
                    selectable_documents: ['idr'],
                })
            }
        }
        // make sure DOM is ready first
        window.onload = () => {
            initSdk();
        }
    </script>
</body>
</html>
```
## Contact

[FPT.AI](https://fpt.ai/) - support@fpt.ai

FPT Tower, 10 Pham Van Bach street, Cau Giay District, Hanoi, Vietnam

1900 638 399