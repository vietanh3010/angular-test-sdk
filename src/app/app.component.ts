import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';


declare global {
    interface Window {
        ekyc: {
            init: (options: Record<string, any>) => void,
            setTheme: (config: Record<string, any>) => void,
            dispose: () => void,
        };
    }
}

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [RouterOutlet],
    // templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    template: `
        <button (click)="initSdk()">click me</button>
    `
})
export class AppComponent {
    title = 'angular-test1';

    initSdk() {
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

        const bearerToken = `Bearer ******`;
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
