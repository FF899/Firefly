import type { AnnouncementConfig } from "../types/config";

export const announcementConfig: AnnouncementConfig = {
	// 公告标题
	title: "Google太坏了！",

	// 公告内容
	content: "Google 在悄悄改变安卓设备上安装应用的方式。了解详情点击下方链接，希望大家都能继续享受自由安装应用的乐趣！",

	// 是否允许用户关闭公告
	closable: true,

	link: {
		// 启用链接
		enable: true,
		// 链接文本
		text: "https://keepandroidopen.org/",
		// 链接 URL
		url: "https://keepandroidopen.org/",
		// 内部链接
		external: true,
	},
};
