import { macos } from 'doc-engine/lib/utils/user-agent';

const CTRL = macos ? '⌘' : 'Ctrl';
const backgroundOrColor = {
  fontColor: '字体颜色',
  bgColor: '背景颜色',
  moreColor: '更多颜色',
};
const layoutLocale = {
  layout: '布局方式',
  layoutBlock: '独占一行',
  layoutInline: '嵌入行内',
};
const alignmentLocale = {
  alignment: '对齐方式',
  alignLeft: '靠左对齐',
  alignCenter: '居中对齐',
  alignRight: '靠右对齐',
};

const uploadLocale = {
  uploadFailed: '文件上传失败，请重试',
  notSupportExt: '不支持该文件类型',
};

const dndLocale = {
  dndTips: '<span>拖动 调整位置<br />点击 打开更多菜单</span>',
  dndInsert: '插入空行',
  dndClone: '克隆',
  dndCopy: '拷贝锚点',
  dndCopySuccess: '已拷贝到粘贴板',
  dndEdit: '编辑锚点',
  dndDelete: '删除',
};
const linkLocale = {
  linkPlaceholder: '请输入链接地址或者锚点',
  linkSave: '保存',
  linkEdit: '编辑',
  linkDelete: '取消链接',
  linkOpen: '打开链接',
};
const editorModalLocale = {
  editorModalClose: '关闭',
  editorModalPopupTips: '确认要放弃刚才编辑的草稿吗？',
  editorModalPopupCancel: '返回编辑',
  editorModalPopupConfirm: '确认',
  editorModalSave: '保存并插入',
  editorModalConfirm: '要在退出前保存本次修改吗？',
  editorModalDissectionAndExit: '放弃编辑并退出',
  editorModalCancel: '取消',
  editorModalSaveAndExit: '保存并退出',
};

export default {
  pure: {
    support: '支持',
  },
  editor: {
    save: '保存草稿',
    print: '打印',
    file: '文档',
    edit: '编辑',
    view: '视图',
    insert: '插入',
    format: '格式',
    lab: '实验室',
    version: '历史',
    help: '帮助',
    publish: '发布更新',
  },
  alignment: {
    buttonTitle: '对齐方式',
    alignLeft: '左对齐',
    alignCenter: '居中对齐',
    alignRight: '右对齐',
    alignJustify: '两端对齐',
  },
  background: backgroundOrColor,
  blockquote: {
    buttonTitle: '插入引用',
    menuTitle: '引用',
  },
  bold: {
    macTitle: '粗体 ⌘+B',
    winTitle: '粗体 Ctrl+B',
    text: '粗体',
  },
  paintformat: {
    buttonTitle: '格式刷',
  },
  clearFormat: {
    buttonTitle: '清除格式',
  },
  code: {
    macTitle: '行内代码',
    winTitle: '行内代码',
    text: '行内代码',
  },
  codeBlock: {
    ...dndLocale,
    buttonTitle: '插入代码块',
    menuTitle: '代码块',
    preview: '预览',
    delete: '删除',
    copyCode: '复制代码',
    copySuccess: '复制成功！',
  },
  color: backgroundOrColor,
  emoji: {
    buttonTitle: 'Emoji 表情',
  },
  localdoc: {
    ...uploadLocale,
    formatError: '不支持该文件嵌入预览',
    allowDownload: '在阅读页下允许下载文件',
  },
  preview: {
    office: 'Office 预览，上传文件大小限制为 100 MB',
    macOffice: '本地文件预览，文件大小限制为 200 MB',
    pdf: 'PDF 预览，上传文件大小限制为 100 MB',
  },
  file: {
    ...uploadLocale,
    ...dndLocale,
    buttonTitle: '上传附件',
    menuTitle: '附件',
    stillUploading: '有文件还在上传中',
    stillTransfering: '有文件还在转存中',
    formatError: '该类型文件请压缩为 ZIP 文件上传',
    sizeError: '上传失败，附件大小限制为 500M',
    placeholder: '上传附件，限制 500M',
    preview: '预览',
    replace: '替换',
    download: '下载',
    delete: '删除',
    transfering: '转存中…',
    invalid: '附件已失效',
    failReadFile: '文件读取失败，请重新上传',
  },
  'table:file': {
    uploadFailed: '附件上传失败，请重试',
  },
  heading: {
    ...dndLocale,
    buttonTitle: '正文与标题',
    normal: '正文',
    heading_1: '标题 1',
    heading_2: '标题 2',
    heading_3: '标题 3',
    heading_4: '标题 4',
    heading_5: '标题 5',
    heading_6: '标题 6',
  },
  fontsize: {
    buttonTitle: '字号',
  },
  history: {
    undo: '撤销',
    redo: '重做',
  },
  hr: {
    ...dndLocale,
    buttonTitle: '插入分割线',
    menuTitle: '分割线',
  },
  image: {
    ...uploadLocale,
    ...layoutLocale,
    ...alignmentLocale,
    ...dndLocale,
    ...linkLocale,
    buttonTitle: '插入图片',
    menuTitle: '图片',
    sizeError: '上传图片失败：图片大小超过 10M',
    uploadFailed: '上传图片失败，请重试',
    stillUploading: '有图片还在上传中',
    uploadTips: '将图片拖至此处或点击选择一个上传，大小限制为 10M',
    copyFailed: '复制图片失败',
    copyFailedTips: '图片不支持拷贝复制，请单独复制上传',
    loadFailed: '网络异常，图片无法展示',
    placeholder: '上传图片，限制 10M',
    sizeTitle: '大小',
    formatError: '不支持该文件类型',
    width: '宽度',
    height: '高度',
    originSize: '原始大小',
    linkTitle: '链接',
    linkPlaceholder: '目标链接',
    linkTargetTips: '在当前页面打开',
    preferences: '图片设置',
    replace: '替换',
    delete: '删除',
    inlineMode: '嵌入行内',
    blockMode: '独占一行',
  },
  'table:image': {
    uploadFailed: '上传图片失败，请重试',
  },
  indent: {
    buttonTitle: '缩进',
    decrease: '减少缩进',
    increase: '增加缩进',
  },
  italic: {
    macTitle: '斜体 ⌘+I',
    winTitle: '斜体 Ctrl+I',
    text: '斜体',
  },
  link: {
    ...linkLocale,
    buttonTitle: '插入链接',
    menuTitle: '链接',
  },
  list: {
    buttonTitle: '列表',
    orderedList: '有序列表',
    unorderedList: '无序列表',
    taskList: '任务列表',
  },
  mark: {
    macTitle: '高亮文字',
    winTitle: '高亮文字',
    text: '高亮文字',
  },
  math: {
    ...layoutLocale,
    ...alignmentLocale,
    ...dndLocale,
    ...linkLocale,
    buttonTitle: '公式',
    menuTitle: '公式',
    success: '操作成功',
    placeholder: '添加 Tex 公式',
    edit: '编辑',
    copy: '拷贝源码',
    delete: '删除',
    cancel: '取消',
    save: '确定',
    sourceCodeRequired: '请输入源码',
    syntaxInvalid: '输入公式不合法',
    help: '了解 LaTeX 语法',
    enterTooltips: ''.concat(CTRL, ' + Enter'),
  },
  mindmap: {
    ...alignmentLocale,
    ...dndLocale,
    ...editorModalLocale,
    menuTitle: '思维导图',
    buttonTitle: '思维导图',
    editorTitle: '思维导图',
    edit: '编辑',
    delete: '删除',
    saveDraft: '保存',
    help: '帮助',
    undo: '撤销',
    redo: '重做',
    insertSibling: '插入同级',
    insertChild: '插入子级',
    collapse: '折叠',
    expand: '展开',
    autoAdjust: '适应画布',
  },
  moremark: {
    buttonTitle: '更多文本样式',
  },
  paste: {
    copy: '复制',
    cut: '剪切',
    paste: '粘贴',
    pastePlainText: '粘贴纯文本',
    pasteMarkdown: '粘贴 Markdown',
    selectAll: '全选',
  },
  textDiagram: {
    ...alignmentLocale,
    ...dndLocale,
    ...editorModalLocale,
    edit: '编辑',
    save: '保存',
    preview: '预览',
    template: '模板',
    help: '帮助',
    genImageError: '生成预览失败，请修改内容',
    winPreviewTooltip: 'Ctrl+Shift+P',
    macPreviewTooltip: '⌘+Shift+P',
  },
  riddle: {
    ...dndLocale,
    buttonTitle: 'Riddle',
    menuTitle: 'Riddle',
    active: 'Click to active',
    replace: '替换',
    delete: '删除',
    addressInvalid: '请输入正确的链接地址',
    placeholder: '输入 Riddle 地址，按 Enter 生成',
  },
  strikethrough: {
    macTitle: '删除线 ⌘+Shift+X',
    winTitle: '删除线 Ctrl+Shift+X',
    text: '删除线',
  },
  sub: {
    macTitle: '下标',
    winTitle: '下标',
    text: '下标',
  },
  sup: {
    macTitle: '上标',
    winTitle: '上标',
    text: '上标',
  },
  table: {
    buttonTitle: '插入表格',
    menuTitle: '表格',
    copy: '复制',
    cut: '剪切',
    merge: '合并单元格',
    unmerge: '拆分单元格',
    clear: '清空选中区域',
    deleteColumn: '删除选中列',
    deleteRow: '删除选中行',
    deleteTable: '删除表格',
  },
  underline: {
    macTitle: '下划线 ⌘+U',
    winTitle: '下划线 Ctrl+U',
    text: '下划线',
  },
  video: {
    ...dndLocale,
    buttonTitle: '插入视频',
    menuTitle: '视频',
    play: '播放',
    replace: '替换',
    download: '下载',
    delete: '删除',
    sizeError: '上传失败，视频大小限制为 2G',
  },
  toc: {
    title: '导航',
    open: '打开导航',
    close: '关闭导航',
  },
  section: {
    mindmapFile: '脑图',
    designingFile: '设计文件',
    officeFile: '办公文件',
    localdocSubTitle: '支持Office、XMind、Sketch 等',
    label: '状态',
    labelDescription: '简易文本状态',
    localdoc: '本地文件',
    localdocDescription: '支持 Word, Excel, PPT, PDF',
    iframeOverLimit: '文档最多支持 ${limit} 张嵌入Section',
    placeholder: 'Section名',
    embed: '嵌入',
    onlinedoc: '在线文档',
    onlinedocDescription: '支持嵌入语雀文档、表格、脑图',
    website: '嵌入网址',
    websiteDescription: '嵌入一个网址',
    buttonTitle: '插入图片、表格、<br />附件、代码块等',
    normal: ' ',
    media: '媒体',
    engineering: '工程',
    description: '输入  <code>'.concat(CTRL, '</code> + <code>/</code>  快速插入区块'),
    table: '表格',
    tableDescription: '插入在线表格',
    image: '图片',
    imageDescription: '上传一张或多张图片',
    video: '本地视频',
    videoDescription: '上传一个本地视频',
    youku: '在线视频',
    youkuName: '优酷',
    youkuDescription: '插入优酷视频',
    youkuSubTitle: '支持优酷、哔哩哔哩',
    bilibili: 'bilibili',
    bilibiliName: '哔哩哔哩',
    bilibiliDescription: '插入哔哩哔哩视频',
    codeblock: '代码块',
    codeblockDescription: '输入代码片段',
    file: '附件',
    fileDescription: '上传单个或多个附件',
    math: '公式',
    mathDescription: '输入 Latex 公式',
    riddle: '代码演示（Riddle）',
    riddleDescription: '插入 Riddle 代码片段',
    mindmap: '脑图',
    mindmapDescription: '绘制简易脑图',
    puml: 'PlantUML',
    pumlDescription: '绘制 PlantUML 图',
    flowchart: 'Flowchart',
    flowchartDescription: '绘制 Flowchart 图',
    mermaid: 'Mermaid',
    mermaidDescription: '绘制 Mermaid 图',
    diagram: '文本绘图',
    diagramDescription: '通过代码绘图',
    diagramSubTitle: '支持PlantUML、Mermaid 等',
    graphviz: 'Graphviz',
    graphvizDescription: '绘制 Graphviz 图',
    lockedtextTitle: '加密文本',
    lockedtextDescription: '需要密码才可查看',
  },
  mention: {
    text: '提及',
  },
  markdown: {
    pasteTitle: '是否需要做样式转换？',
    pasteContent: '检测到粘贴内容符合 Markdown 语法，是否需要做样式转换？',
    pasteButton: '立即转换',
  },
  search: {
    searchAndReplace: '查找并替换',
    search: '查找',
    replace: '替换',
    replaceAll: '替换全部',
    replaceTo: '替换为',
    pleaseEnter: '请输入',
    next: '下一个',
    previous: '上一个',
  },
  translate: {
    title: '翻译',
    subTitle: '源 & 目标',
    automaticDetection: '自动检测',
    zh: '中文',
    en: '英文',
    translation: '译文',
    insertDoc: '插入文档',
    placeholder: '请在文档中选择需要翻译的内容',
  },
};
