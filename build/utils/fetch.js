"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTrainTickets = exports.jwtToken = void 0;
const fetch = require("node-fetch");
exports.jwtToken = 'eyJhbGciOiJSUzI1NiIsImtpZCI6IiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJwYWFzLnBhc3Nwb3J0LmF1dGgiLCJleHAiOjE3MDAxMzIwMDksImlhdCI6MTcwMDEyODM0OSwidXNlcm5hbWUiOiJ6aGVuZ3lhbmJpbiIsInR5cGUiOiJwZXJzb25fYWNjb3VudCIsInJlZ2lvbiI6ImNuIiwidHJ1c3RlZCI6dHJ1ZSwidXVpZCI6IjdmMGJlYjU0LTU2NWUtNDE4Yy1hNWY3LWJkOTNkYjU3YjJiNyIsInNpdGUiOiJvbmxpbmUiLCJzY29wZSI6ImJ5dGVkYW5jZSIsInNlcXVlbmNlIjoiUkQiLCJvcmdhbml6YXRpb24iOiLkuqflk4HnoJTlj5Hlkozlt6XnqIvmnrbmnoQtR2xvYmFsIEUtQ29tbWVyY2Ut5raI6LS56ICF5Lia5YqhLeWJjeerry3mkJzntKIiLCJ3b3JrX2NvdW50cnkiOiJDSE4iLCJsb2NhdGlvbiI6IkNOIiwiYXZhdGFyX3VybCI6Imh0dHBzOi8vczEtaW1maWxlLmZlaXNodWNkbi5jb20vc3RhdGljLXJlc291cmNlL3YxL3YyX2JhNWU0OGRlLTUwNmYtNGQ4MS04YmU4LWE1MGIzYjNkOWI5Z34_aW1hZ2Vfc2l6ZT1ub29wXHUwMDI2Y3V0X3R5cGU9XHUwMDI2cXVhbGl0eT1cdTAwMjZmb3JtYXQ9cG5nXHUwMDI2c3RpY2tlcl9mb3JtYXQ9LndlYnAiLCJlbWFpbCI6InpoZW5neWFuYmluQGJ5dGVkYW5jZS5jb20iLCJlbXBsb3llZV9pZCI6MzMwODI1MX0.ThHx94037C2HgToypURS9nZs7x2Xdn-_CmmAumNjCV47iiq7Ic-tQcQFcO1LfA0ixER1ObOw5r2Pa3fvaDk8Y6W2fPdSzqP1bivq8qkCgxz6mQWq_qAfJyrGmyl5Hb6sRv3qb5S3FbtNAQU_EXVtS8oAzh39o-3dm0MfoAuvV00';
async function getTrainTickets({ trainId, }) {
    // @ts-ignore
    const response = await fetch(`https://bytecycle-api.bytedance.net/api/v1/release_train/query_tickets?page=1&page_size=2&train_id=${trainId}&workspace_id=114522`, {
        headers: {
            ...getCommonHeaders({ jwtToken: exports.jwtToken }),
            domain: "canal_delivery_app",
        },
        body: null,
        method: "GET",
    });
    const body = await response.json();
    return body;
}
exports.getTrainTickets = getTrainTickets;
const getCommonHeaders = ({ jwtToken }) => {
    return {
        accept: "application/json, text/plain, */*",
        "accept-language": "zh",
        "cache-control": "no-cache",
        "content-type": "application/json;charset=UTF-8",
        no_error_notification: "false",
        pragma: "no-cache",
        "sec-ch-ua": '"Google Chrome";v="105", "Not)A;Brand";v="8", "Chromium";v="105"',
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": '"macOS"',
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-site",
        "x-bytecycle-use-utc-time": "1",
        "x-jwt-token": jwtToken,
        Referer: "https://bytecycle.bytedance.net/",
        "Referrer-Policy": "strict-origin-when-cross-origin",
    };
};
