const { i18n } = require("./next-i18next.config");

// const cspHeader = `
//     default-src 'self';
//     script-src 'self';
//     style-src 'self';
//     img-src 'self' blob:;
//     font-src 'self';
//     connect-src 'self' http://localhost:3000;
//     object-src 'none';
//     base-uri 'self';
//     form-action 'self';
//     frame-ancestors 'none';
//     upgrade-insecure-requests;
// `;

module.exports = {
	i18n,
	// async headers() {
	// 	return [
	// 		{
	// 			source: "/(.*)",
	// 			headers: [
	// 				{
	// 					key: "Content-Security-Policy",
	// 					value: cspHeader.replace(/\n/g, ""),
	// 				},
	// 			],
	// 		},
	// 	];
	// },
};
