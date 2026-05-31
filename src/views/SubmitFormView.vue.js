import { ref, reactive } from 'vue';
import { useRouter } from 'vue-router';
import { Promotion, Document, SuccessFilled } from '@element-plus/icons-vue';
import { ElMessage } from 'element-plus';
const router = useRouter();
const formRef = ref();
const submitting = ref(false);
const form = reactive({
    name: '',
    repoUrl: '',
    description: '',
    tags: '',
    author: '',
});
const rules = {
    name: [
        { required: true, message: '请输入 Skill 名称', trigger: 'blur' },
        { min: 2, max: 50, message: '长度在 2 到 50 个字符', trigger: 'blur' },
    ],
    repoUrl: [
        { required: true, message: '请输入仓库地址', trigger: 'blur' },
        { type: 'url', message: '请输入有效的 URL 地址', trigger: 'blur' },
    ],
    description: [
        { required: true, message: '请输入简介说明', trigger: 'blur' },
        { min: 10, max: 300, message: '长度在 10 到 300 个字符', trigger: 'blur' },
    ],
    tags: [
        { required: true, message: '请输入标签', trigger: 'blur' },
    ],
    author: [
        { required: true, message: '请输入作者/来源', trigger: 'blur' },
    ],
};
async function handleSubmit() {
    if (!formRef.value)
        return;
    try {
        await formRef.value.validate();
        submitting.value = true;
        const tags = form.tags
            .split(/[,，]/)
            .map(t => t.trim())
            .filter(t => t.length > 0);
        const payload = {
            name: form.name.trim(),
            repoUrl: form.repoUrl.trim(),
            description: form.description.trim(),
            tags,
            author: form.author.trim(),
        };
        const existing = localStorage.getItem('skills-zoom-submissions');
        const submissions = existing ? JSON.parse(existing) : [];
        submissions.push({
            ...payload,
            id: `sub-${Date.now()}`,
            submittedAt: new Date().toISOString().slice(0, 10),
            status: 'pending',
        });
        localStorage.setItem('skills-zoom-submissions', JSON.stringify(submissions));
        ElMessage.success('投稿成功！审核通过后将上架展示。');
        router.push('/');
    }
    catch {
        // 表单校验失败
    }
    finally {
        submitting.value = false;
    }
}
function handleReset() {
    formRef.value?.resetFields();
}
const __VLS_ctx = {
    ...{},
    ...{},
};
let __VLS_components;
let __VLS_intrinsics;
let __VLS_directives;
/** @type {__VLS_StyleScopedClasses['contact']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "submit-form-view" },
});
/** @type {__VLS_StyleScopedClasses['submit-form-view']} */ ;
let __VLS_0;
/** @ts-ignore @type { | typeof __VLS_components.elCard | typeof __VLS_components.ElCard | typeof __VLS_components['el-card'] | typeof __VLS_components.elCard | typeof __VLS_components.ElCard | typeof __VLS_components['el-card']} */
elCard;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent1(__VLS_0, new __VLS_0({
    ...{ class: "submit-card" },
    shadow: "never",
}));
const __VLS_2 = __VLS_1({
    ...{ class: "submit-card" },
    shadow: "never",
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
/** @type {__VLS_StyleScopedClasses['submit-card']} */ ;
const { default: __VLS_5 } = __VLS_3.slots;
{
    const { header: __VLS_6 } = __VLS_3.slots;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "card-header" },
    });
    /** @type {__VLS_StyleScopedClasses['card-header']} */ ;
    let __VLS_7;
    /** @ts-ignore @type { | typeof __VLS_components.elIcon | typeof __VLS_components.ElIcon | typeof __VLS_components['el-icon'] | typeof __VLS_components.elIcon | typeof __VLS_components.ElIcon | typeof __VLS_components['el-icon']} */
    elIcon;
    // @ts-ignore
    const __VLS_8 = __VLS_asFunctionalComponent1(__VLS_7, new __VLS_7({
        size: "20",
    }));
    const __VLS_9 = __VLS_8({
        size: "20",
    }, ...__VLS_functionalComponentArgsRest(__VLS_8));
    const { default: __VLS_12 } = __VLS_10.slots;
    let __VLS_13;
    /** @ts-ignore @type { | typeof __VLS_components.Promotion} */
    Promotion;
    // @ts-ignore
    const __VLS_14 = __VLS_asFunctionalComponent1(__VLS_13, new __VLS_13({}));
    const __VLS_15 = __VLS_14({}, ...__VLS_functionalComponentArgsRest(__VLS_14));
    var __VLS_10;
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({});
}
let __VLS_18;
/** @ts-ignore @type { | typeof __VLS_components.elAlert | typeof __VLS_components.ElAlert | typeof __VLS_components['el-alert']} */
elAlert;
// @ts-ignore
const __VLS_19 = __VLS_asFunctionalComponent1(__VLS_18, new __VLS_18({
    title: "欢迎投稿分享你的好用 Skill！",
    type: "info",
    closable: (false),
    showIcon: true,
    ...{ class: "welcome-alert" },
}));
const __VLS_20 = __VLS_19({
    title: "欢迎投稿分享你的好用 Skill！",
    type: "info",
    closable: (false),
    showIcon: true,
    ...{ class: "welcome-alert" },
}, ...__VLS_functionalComponentArgsRest(__VLS_19));
/** @type {__VLS_StyleScopedClasses['welcome-alert']} */ ;
let __VLS_23;
/** @ts-ignore @type { | typeof __VLS_components.elForm | typeof __VLS_components.ElForm | typeof __VLS_components['el-form'] | typeof __VLS_components.elForm | typeof __VLS_components.ElForm | typeof __VLS_components['el-form']} */
elForm;
// @ts-ignore
const __VLS_24 = __VLS_asFunctionalComponent1(__VLS_23, new __VLS_23({
    ref: "formRef",
    model: (__VLS_ctx.form),
    rules: (__VLS_ctx.rules),
    labelPosition: "top",
    ...{ class: "submit-form" },
}));
const __VLS_25 = __VLS_24({
    ref: "formRef",
    model: (__VLS_ctx.form),
    rules: (__VLS_ctx.rules),
    labelPosition: "top",
    ...{ class: "submit-form" },
}, ...__VLS_functionalComponentArgsRest(__VLS_24));
var __VLS_28;
/** @type {__VLS_StyleScopedClasses['submit-form']} */ ;
const { default: __VLS_30 } = __VLS_26.slots;
let __VLS_31;
/** @ts-ignore @type { | typeof __VLS_components.elFormItem | typeof __VLS_components.ElFormItem | typeof __VLS_components['el-form-item'] | typeof __VLS_components.elFormItem | typeof __VLS_components.ElFormItem | typeof __VLS_components['el-form-item']} */
elFormItem;
// @ts-ignore
const __VLS_32 = __VLS_asFunctionalComponent1(__VLS_31, new __VLS_31({
    label: "Skill 名称",
    prop: "name",
}));
const __VLS_33 = __VLS_32({
    label: "Skill 名称",
    prop: "name",
}, ...__VLS_functionalComponentArgsRest(__VLS_32));
const { default: __VLS_36 } = __VLS_34.slots;
let __VLS_37;
/** @ts-ignore @type { | typeof __VLS_components.elInput | typeof __VLS_components.ElInput | typeof __VLS_components['el-input']} */
elInput;
// @ts-ignore
const __VLS_38 = __VLS_asFunctionalComponent1(__VLS_37, new __VLS_37({
    modelValue: (__VLS_ctx.form.name),
    placeholder: "项目的简短名称",
    maxlength: "50",
    showWordLimit: true,
}));
const __VLS_39 = __VLS_38({
    modelValue: (__VLS_ctx.form.name),
    placeholder: "项目的简短名称",
    maxlength: "50",
    showWordLimit: true,
}, ...__VLS_functionalComponentArgsRest(__VLS_38));
// @ts-ignore
[form, form, rules,];
var __VLS_34;
let __VLS_42;
/** @ts-ignore @type { | typeof __VLS_components.elFormItem | typeof __VLS_components.ElFormItem | typeof __VLS_components['el-form-item'] | typeof __VLS_components.elFormItem | typeof __VLS_components.ElFormItem | typeof __VLS_components['el-form-item']} */
elFormItem;
// @ts-ignore
const __VLS_43 = __VLS_asFunctionalComponent1(__VLS_42, new __VLS_42({
    label: "GitHub 仓库地址",
    prop: "repoUrl",
}));
const __VLS_44 = __VLS_43({
    label: "GitHub 仓库地址",
    prop: "repoUrl",
}, ...__VLS_functionalComponentArgsRest(__VLS_43));
const { default: __VLS_47 } = __VLS_45.slots;
let __VLS_48;
/** @ts-ignore @type { | typeof __VLS_components.elInput | typeof __VLS_components.ElInput | typeof __VLS_components['el-input']} */
elInput;
// @ts-ignore
const __VLS_49 = __VLS_asFunctionalComponent1(__VLS_48, new __VLS_48({
    modelValue: (__VLS_ctx.form.repoUrl),
    placeholder: "https://github.com/xxx/xxx",
}));
const __VLS_50 = __VLS_49({
    modelValue: (__VLS_ctx.form.repoUrl),
    placeholder: "https://github.com/xxx/xxx",
}, ...__VLS_functionalComponentArgsRest(__VLS_49));
// @ts-ignore
[form,];
var __VLS_45;
let __VLS_53;
/** @ts-ignore @type { | typeof __VLS_components.elFormItem | typeof __VLS_components.ElFormItem | typeof __VLS_components['el-form-item'] | typeof __VLS_components.elFormItem | typeof __VLS_components.ElFormItem | typeof __VLS_components['el-form-item']} */
elFormItem;
// @ts-ignore
const __VLS_54 = __VLS_asFunctionalComponent1(__VLS_53, new __VLS_53({
    label: "简介说明",
    prop: "description",
}));
const __VLS_55 = __VLS_54({
    label: "简介说明",
    prop: "description",
}, ...__VLS_functionalComponentArgsRest(__VLS_54));
const { default: __VLS_58 } = __VLS_56.slots;
let __VLS_59;
/** @ts-ignore @type { | typeof __VLS_components.elInput | typeof __VLS_components.ElInput | typeof __VLS_components['el-input']} */
elInput;
// @ts-ignore
const __VLS_60 = __VLS_asFunctionalComponent1(__VLS_59, new __VLS_59({
    modelValue: (__VLS_ctx.form.description),
    type: "textarea",
    rows: (4),
    placeholder: "一句话描述项目用途和亮点",
    maxlength: "300",
    showWordLimit: true,
}));
const __VLS_61 = __VLS_60({
    modelValue: (__VLS_ctx.form.description),
    type: "textarea",
    rows: (4),
    placeholder: "一句话描述项目用途和亮点",
    maxlength: "300",
    showWordLimit: true,
}, ...__VLS_functionalComponentArgsRest(__VLS_60));
// @ts-ignore
[form,];
var __VLS_56;
let __VLS_64;
/** @ts-ignore @type { | typeof __VLS_components.elFormItem | typeof __VLS_components.ElFormItem | typeof __VLS_components['el-form-item'] | typeof __VLS_components.elFormItem | typeof __VLS_components.ElFormItem | typeof __VLS_components['el-form-item']} */
elFormItem;
// @ts-ignore
const __VLS_65 = __VLS_asFunctionalComponent1(__VLS_64, new __VLS_64({
    label: "标签",
    prop: "tags",
}));
const __VLS_66 = __VLS_65({
    label: "标签",
    prop: "tags",
}, ...__VLS_functionalComponentArgsRest(__VLS_65));
const { default: __VLS_69 } = __VLS_67.slots;
let __VLS_70;
/** @ts-ignore @type { | typeof __VLS_components.elInput | typeof __VLS_components.ElInput | typeof __VLS_components['el-input']} */
elInput;
// @ts-ignore
const __VLS_71 = __VLS_asFunctionalComponent1(__VLS_70, new __VLS_70({
    modelValue: (__VLS_ctx.form.tags),
    placeholder: "用逗号分隔，如：Vue3, AI工具, 效率",
}));
const __VLS_72 = __VLS_71({
    modelValue: (__VLS_ctx.form.tags),
    placeholder: "用逗号分隔，如：Vue3, AI工具, 效率",
}, ...__VLS_functionalComponentArgsRest(__VLS_71));
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "form-hint" },
});
/** @type {__VLS_StyleScopedClasses['form-hint']} */ ;
// @ts-ignore
[form,];
var __VLS_67;
let __VLS_75;
/** @ts-ignore @type { | typeof __VLS_components.elFormItem | typeof __VLS_components.ElFormItem | typeof __VLS_components['el-form-item'] | typeof __VLS_components.elFormItem | typeof __VLS_components.ElFormItem | typeof __VLS_components['el-form-item']} */
elFormItem;
// @ts-ignore
const __VLS_76 = __VLS_asFunctionalComponent1(__VLS_75, new __VLS_75({
    label: "作者/来源",
    prop: "author",
}));
const __VLS_77 = __VLS_76({
    label: "作者/来源",
    prop: "author",
}, ...__VLS_functionalComponentArgsRest(__VLS_76));
const { default: __VLS_80 } = __VLS_78.slots;
let __VLS_81;
/** @ts-ignore @type { | typeof __VLS_components.elInput | typeof __VLS_components.ElInput | typeof __VLS_components['el-input']} */
elInput;
// @ts-ignore
const __VLS_82 = __VLS_asFunctionalComponent1(__VLS_81, new __VLS_81({
    modelValue: (__VLS_ctx.form.author),
    placeholder: "项目作者或推荐人信息",
}));
const __VLS_83 = __VLS_82({
    modelValue: (__VLS_ctx.form.author),
    placeholder: "项目作者或推荐人信息",
}, ...__VLS_functionalComponentArgsRest(__VLS_82));
// @ts-ignore
[form,];
var __VLS_78;
let __VLS_86;
/** @ts-ignore @type { | typeof __VLS_components.elFormItem | typeof __VLS_components.ElFormItem | typeof __VLS_components['el-form-item'] | typeof __VLS_components.elFormItem | typeof __VLS_components.ElFormItem | typeof __VLS_components['el-form-item']} */
elFormItem;
// @ts-ignore
const __VLS_87 = __VLS_asFunctionalComponent1(__VLS_86, new __VLS_86({}));
const __VLS_88 = __VLS_87({}, ...__VLS_functionalComponentArgsRest(__VLS_87));
const { default: __VLS_91 } = __VLS_89.slots;
let __VLS_92;
/** @ts-ignore @type { | typeof __VLS_components.elButton | typeof __VLS_components.ElButton | typeof __VLS_components['el-button'] | typeof __VLS_components.elButton | typeof __VLS_components.ElButton | typeof __VLS_components['el-button']} */
elButton;
// @ts-ignore
const __VLS_93 = __VLS_asFunctionalComponent1(__VLS_92, new __VLS_92({
    ...{ 'onClick': {} },
    type: "primary",
    loading: (__VLS_ctx.submitting),
}));
const __VLS_94 = __VLS_93({
    ...{ 'onClick': {} },
    type: "primary",
    loading: (__VLS_ctx.submitting),
}, ...__VLS_functionalComponentArgsRest(__VLS_93));
let __VLS_97;
const __VLS_98 = ({ click: {} },
    { onClick: (__VLS_ctx.handleSubmit) });
const { default: __VLS_99 } = __VLS_95.slots;
// @ts-ignore
[submitting, handleSubmit,];
var __VLS_95;
var __VLS_96;
let __VLS_100;
/** @ts-ignore @type { | typeof __VLS_components.elButton | typeof __VLS_components.ElButton | typeof __VLS_components['el-button'] | typeof __VLS_components.elButton | typeof __VLS_components.ElButton | typeof __VLS_components['el-button']} */
elButton;
// @ts-ignore
const __VLS_101 = __VLS_asFunctionalComponent1(__VLS_100, new __VLS_100({
    ...{ 'onClick': {} },
}));
const __VLS_102 = __VLS_101({
    ...{ 'onClick': {} },
}, ...__VLS_functionalComponentArgsRest(__VLS_101));
let __VLS_105;
const __VLS_106 = ({ click: {} },
    { onClick: (__VLS_ctx.handleReset) });
const { default: __VLS_107 } = __VLS_103.slots;
// @ts-ignore
[handleReset,];
var __VLS_103;
var __VLS_104;
// @ts-ignore
[];
var __VLS_89;
// @ts-ignore
[];
var __VLS_26;
let __VLS_108;
/** @ts-ignore @type { | typeof __VLS_components.elDivider | typeof __VLS_components.ElDivider | typeof __VLS_components['el-divider']} */
elDivider;
// @ts-ignore
const __VLS_109 = __VLS_asFunctionalComponent1(__VLS_108, new __VLS_108({}));
const __VLS_110 = __VLS_109({}, ...__VLS_functionalComponentArgsRest(__VLS_109));
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "rules" },
});
/** @type {__VLS_StyleScopedClasses['rules']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.h3, __VLS_intrinsics.h3)({});
let __VLS_113;
/** @ts-ignore @type { | typeof __VLS_components.elIcon | typeof __VLS_components.ElIcon | typeof __VLS_components['el-icon'] | typeof __VLS_components.elIcon | typeof __VLS_components.ElIcon | typeof __VLS_components['el-icon']} */
elIcon;
// @ts-ignore
const __VLS_114 = __VLS_asFunctionalComponent1(__VLS_113, new __VLS_113({}));
const __VLS_115 = __VLS_114({}, ...__VLS_functionalComponentArgsRest(__VLS_114));
const { default: __VLS_118 } = __VLS_116.slots;
let __VLS_119;
/** @ts-ignore @type { | typeof __VLS_components.Document} */
Document;
// @ts-ignore
const __VLS_120 = __VLS_asFunctionalComponent1(__VLS_119, new __VLS_119({}));
const __VLS_121 = __VLS_120({}, ...__VLS_functionalComponentArgsRest(__VLS_120));
// @ts-ignore
[];
var __VLS_116;
let __VLS_124;
/** @ts-ignore @type { | typeof __VLS_components.elTimeline | typeof __VLS_components.ElTimeline | typeof __VLS_components['el-timeline'] | typeof __VLS_components.elTimeline | typeof __VLS_components.ElTimeline | typeof __VLS_components['el-timeline']} */
elTimeline;
// @ts-ignore
const __VLS_125 = __VLS_asFunctionalComponent1(__VLS_124, new __VLS_124({}));
const __VLS_126 = __VLS_125({}, ...__VLS_functionalComponentArgsRest(__VLS_125));
const { default: __VLS_129 } = __VLS_127.slots;
let __VLS_130;
/** @ts-ignore @type { | typeof __VLS_components.elTimelineItem | typeof __VLS_components.ElTimelineItem | typeof __VLS_components['el-timeline-item'] | typeof __VLS_components.elTimelineItem | typeof __VLS_components.ElTimelineItem | typeof __VLS_components['el-timeline-item']} */
elTimelineItem;
// @ts-ignore
const __VLS_131 = __VLS_asFunctionalComponent1(__VLS_130, new __VLS_130({
    type: "success",
}));
const __VLS_132 = __VLS_131({
    type: "success",
}, ...__VLS_functionalComponentArgsRest(__VLS_131));
const { default: __VLS_135 } = __VLS_133.slots;
__VLS_asFunctionalElement1(__VLS_intrinsics.strong, __VLS_intrinsics.strong)({});
// @ts-ignore
[];
var __VLS_133;
let __VLS_136;
/** @ts-ignore @type { | typeof __VLS_components.elTimelineItem | typeof __VLS_components.ElTimelineItem | typeof __VLS_components['el-timeline-item'] | typeof __VLS_components.elTimelineItem | typeof __VLS_components.ElTimelineItem | typeof __VLS_components['el-timeline-item']} */
elTimelineItem;
// @ts-ignore
const __VLS_137 = __VLS_asFunctionalComponent1(__VLS_136, new __VLS_136({
    type: "success",
}));
const __VLS_138 = __VLS_137({
    type: "success",
}, ...__VLS_functionalComponentArgsRest(__VLS_137));
const { default: __VLS_141 } = __VLS_139.slots;
__VLS_asFunctionalElement1(__VLS_intrinsics.strong, __VLS_intrinsics.strong)({});
// @ts-ignore
[];
var __VLS_139;
let __VLS_142;
/** @ts-ignore @type { | typeof __VLS_components.elTimelineItem | typeof __VLS_components.ElTimelineItem | typeof __VLS_components['el-timeline-item'] | typeof __VLS_components.elTimelineItem | typeof __VLS_components.ElTimelineItem | typeof __VLS_components['el-timeline-item']} */
elTimelineItem;
// @ts-ignore
const __VLS_143 = __VLS_asFunctionalComponent1(__VLS_142, new __VLS_142({
    type: "success",
}));
const __VLS_144 = __VLS_143({
    type: "success",
}, ...__VLS_functionalComponentArgsRest(__VLS_143));
const { default: __VLS_147 } = __VLS_145.slots;
__VLS_asFunctionalElement1(__VLS_intrinsics.strong, __VLS_intrinsics.strong)({});
// @ts-ignore
[];
var __VLS_145;
let __VLS_148;
/** @ts-ignore @type { | typeof __VLS_components.elTimelineItem | typeof __VLS_components.ElTimelineItem | typeof __VLS_components['el-timeline-item'] | typeof __VLS_components.elTimelineItem | typeof __VLS_components.ElTimelineItem | typeof __VLS_components['el-timeline-item']} */
elTimelineItem;
// @ts-ignore
const __VLS_149 = __VLS_asFunctionalComponent1(__VLS_148, new __VLS_148({
    type: "warning",
}));
const __VLS_150 = __VLS_149({
    type: "warning",
}, ...__VLS_functionalComponentArgsRest(__VLS_149));
const { default: __VLS_153 } = __VLS_151.slots;
__VLS_asFunctionalElement1(__VLS_intrinsics.strong, __VLS_intrinsics.strong)({});
// @ts-ignore
[];
var __VLS_151;
// @ts-ignore
[];
var __VLS_127;
let __VLS_154;
/** @ts-ignore @type { | typeof __VLS_components.elDivider | typeof __VLS_components.ElDivider | typeof __VLS_components['el-divider']} */
elDivider;
// @ts-ignore
const __VLS_155 = __VLS_asFunctionalComponent1(__VLS_154, new __VLS_154({}));
const __VLS_156 = __VLS_155({}, ...__VLS_functionalComponentArgsRest(__VLS_155));
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "contact" },
});
/** @type {__VLS_StyleScopedClasses['contact']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.h3, __VLS_intrinsics.h3)({});
let __VLS_159;
/** @ts-ignore @type { | typeof __VLS_components.elIcon | typeof __VLS_components.ElIcon | typeof __VLS_components['el-icon'] | typeof __VLS_components.elIcon | typeof __VLS_components.ElIcon | typeof __VLS_components['el-icon']} */
elIcon;
// @ts-ignore
const __VLS_160 = __VLS_asFunctionalComponent1(__VLS_159, new __VLS_159({}));
const __VLS_161 = __VLS_160({}, ...__VLS_functionalComponentArgsRest(__VLS_160));
const { default: __VLS_164 } = __VLS_162.slots;
let __VLS_165;
/** @ts-ignore @type { | typeof __VLS_components.SuccessFilled} */
SuccessFilled;
// @ts-ignore
const __VLS_166 = __VLS_asFunctionalComponent1(__VLS_165, new __VLS_165({}));
const __VLS_167 = __VLS_166({}, ...__VLS_functionalComponentArgsRest(__VLS_166));
// @ts-ignore
[];
var __VLS_162;
__VLS_asFunctionalElement1(__VLS_intrinsics.p, __VLS_intrinsics.p)({});
let __VLS_170;
/** @ts-ignore @type { | typeof __VLS_components.elDescriptions | typeof __VLS_components.ElDescriptions | typeof __VLS_components['el-descriptions'] | typeof __VLS_components.elDescriptions | typeof __VLS_components.ElDescriptions | typeof __VLS_components['el-descriptions']} */
elDescriptions;
// @ts-ignore
const __VLS_171 = __VLS_asFunctionalComponent1(__VLS_170, new __VLS_170({
    column: (1),
    border: true,
}));
const __VLS_172 = __VLS_171({
    column: (1),
    border: true,
}, ...__VLS_functionalComponentArgsRest(__VLS_171));
const { default: __VLS_175 } = __VLS_173.slots;
let __VLS_176;
/** @ts-ignore @type { | typeof __VLS_components.elDescriptionsItem | typeof __VLS_components.ElDescriptionsItem | typeof __VLS_components['el-descriptions-item'] | typeof __VLS_components.elDescriptionsItem | typeof __VLS_components.ElDescriptionsItem | typeof __VLS_components['el-descriptions-item']} */
elDescriptionsItem;
// @ts-ignore
const __VLS_177 = __VLS_asFunctionalComponent1(__VLS_176, new __VLS_176({
    label: "公众号",
}));
const __VLS_178 = __VLS_177({
    label: "公众号",
}, ...__VLS_functionalComponentArgsRest(__VLS_177));
const { default: __VLS_181 } = __VLS_179.slots;
// @ts-ignore
[];
var __VLS_179;
let __VLS_182;
/** @ts-ignore @type { | typeof __VLS_components.elDescriptionsItem | typeof __VLS_components.ElDescriptionsItem | typeof __VLS_components['el-descriptions-item'] | typeof __VLS_components.elDescriptionsItem | typeof __VLS_components.ElDescriptionsItem | typeof __VLS_components['el-descriptions-item']} */
elDescriptionsItem;
// @ts-ignore
const __VLS_183 = __VLS_asFunctionalComponent1(__VLS_182, new __VLS_182({
    label: "GitHub",
}));
const __VLS_184 = __VLS_183({
    label: "GitHub",
}, ...__VLS_functionalComponentArgsRest(__VLS_183));
const { default: __VLS_187 } = __VLS_185.slots;
let __VLS_188;
/** @ts-ignore @type { | typeof __VLS_components.elLink | typeof __VLS_components.ElLink | typeof __VLS_components['el-link'] | typeof __VLS_components.elLink | typeof __VLS_components.ElLink | typeof __VLS_components['el-link']} */
elLink;
// @ts-ignore
const __VLS_189 = __VLS_asFunctionalComponent1(__VLS_188, new __VLS_188({
    type: "primary",
    href: "https://github.com/duguBoss/skills-zoom",
    target: "_blank",
}));
const __VLS_190 = __VLS_189({
    type: "primary",
    href: "https://github.com/duguBoss/skills-zoom",
    target: "_blank",
}, ...__VLS_functionalComponentArgsRest(__VLS_189));
const { default: __VLS_193 } = __VLS_191.slots;
// @ts-ignore
[];
var __VLS_191;
// @ts-ignore
[];
var __VLS_185;
// @ts-ignore
[];
var __VLS_173;
// @ts-ignore
[];
var __VLS_3;
// @ts-ignore
var __VLS_29 = __VLS_28;
// @ts-ignore
[];
const __VLS_export = (await import('vue')).defineComponent({});
export default {};
