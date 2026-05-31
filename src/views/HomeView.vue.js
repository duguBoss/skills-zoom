import { useSkillsStore } from '@/stores/skills';
import SkillCard from '@/components/SkillCard.vue';
import { Search, Filter, Download, Check, Close } from '@element-plus/icons-vue';
import { ElMessage } from 'element-plus';
const store = useSkillsStore();
function handleTagClick(tag) {
    store.toggleTag(tag);
}
function handleExport() {
    if (store.selectedSkillIds.length === 0) {
        ElMessage.warning('请先选择至少一个 Skill');
        return;
    }
    const content = store.exportSelected();
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `skills-export-${new Date().toISOString().slice(0, 10)}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    ElMessage.success(`已导出 ${store.selectedSkillIds.length} 个 Skill 地址`);
}
function handleCopy() {
    if (store.selectedSkillIds.length === 0) {
        ElMessage.warning('请先选择至少一个 Skill');
        return;
    }
    const content = store.exportSelected();
    navigator.clipboard.writeText(content).then(() => {
        ElMessage.success('已复制到剪贴板');
    }).catch(() => {
        ElMessage.error('复制失败');
    });
}
function clearFilters() {
    store.selectedTags = [];
    store.searchQuery = '';
}
const __VLS_ctx = {
    ...{},
    ...{},
};
let __VLS_components;
let __VLS_intrinsics;
let __VLS_directives;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "home-view" },
});
/** @type {__VLS_StyleScopedClasses['home-view']} */ ;
let __VLS_0;
/** @ts-ignore @type { | typeof __VLS_components.elRow | typeof __VLS_components.ElRow | typeof __VLS_components['el-row'] | typeof __VLS_components.elRow | typeof __VLS_components.ElRow | typeof __VLS_components['el-row']} */
elRow;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent1(__VLS_0, new __VLS_0({
    gutter: (16),
    ...{ class: "stats-bar" },
    align: "middle",
}));
const __VLS_2 = __VLS_1({
    gutter: (16),
    ...{ class: "stats-bar" },
    align: "middle",
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
/** @type {__VLS_StyleScopedClasses['stats-bar']} */ ;
const { default: __VLS_5 } = __VLS_3.slots;
let __VLS_6;
/** @ts-ignore @type { | typeof __VLS_components.elCol | typeof __VLS_components.ElCol | typeof __VLS_components['el-col'] | typeof __VLS_components.elCol | typeof __VLS_components.ElCol | typeof __VLS_components['el-col']} */
elCol;
// @ts-ignore
const __VLS_7 = __VLS_asFunctionalComponent1(__VLS_6, new __VLS_6({
    span: (12),
}));
const __VLS_8 = __VLS_7({
    span: (12),
}, ...__VLS_functionalComponentArgsRest(__VLS_7));
const { default: __VLS_11 } = __VLS_9.slots;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "stats" },
});
/** @type {__VLS_StyleScopedClasses['stats']} */ ;
let __VLS_12;
/** @ts-ignore @type { | typeof __VLS_components.elTag | typeof __VLS_components.ElTag | typeof __VLS_components['el-tag'] | typeof __VLS_components.elTag | typeof __VLS_components.ElTag | typeof __VLS_components['el-tag']} */
elTag;
// @ts-ignore
const __VLS_13 = __VLS_asFunctionalComponent1(__VLS_12, new __VLS_12({
    size: "large",
    type: "info",
}));
const __VLS_14 = __VLS_13({
    size: "large",
    type: "info",
}, ...__VLS_functionalComponentArgsRest(__VLS_13));
const { default: __VLS_17 } = __VLS_15.slots;
(__VLS_ctx.store.skills.length);
// @ts-ignore
[store,];
var __VLS_15;
if (__VLS_ctx.store.selectedSkillIds.length > 0) {
    let __VLS_18;
    /** @ts-ignore @type { | typeof __VLS_components.elTag | typeof __VLS_components.ElTag | typeof __VLS_components['el-tag'] | typeof __VLS_components.elTag | typeof __VLS_components.ElTag | typeof __VLS_components['el-tag']} */
    elTag;
    // @ts-ignore
    const __VLS_19 = __VLS_asFunctionalComponent1(__VLS_18, new __VLS_18({
        size: "large",
        type: "success",
    }));
    const __VLS_20 = __VLS_19({
        size: "large",
        type: "success",
    }, ...__VLS_functionalComponentArgsRest(__VLS_19));
    const { default: __VLS_23 } = __VLS_21.slots;
    (__VLS_ctx.store.selectedSkillIds.length);
    // @ts-ignore
    [store, store,];
    var __VLS_21;
}
if (__VLS_ctx.store.selectedTags.length > 0) {
    let __VLS_24;
    /** @ts-ignore @type { | typeof __VLS_components.elTag | typeof __VLS_components.ElTag | typeof __VLS_components['el-tag'] | typeof __VLS_components.elTag | typeof __VLS_components.ElTag | typeof __VLS_components['el-tag']} */
    elTag;
    // @ts-ignore
    const __VLS_25 = __VLS_asFunctionalComponent1(__VLS_24, new __VLS_24({
        size: "large",
        type: "warning",
    }));
    const __VLS_26 = __VLS_25({
        size: "large",
        type: "warning",
    }, ...__VLS_functionalComponentArgsRest(__VLS_25));
    const { default: __VLS_29 } = __VLS_27.slots;
    // @ts-ignore
    [store,];
    var __VLS_27;
}
// @ts-ignore
[];
var __VLS_9;
let __VLS_30;
/** @ts-ignore @type { | typeof __VLS_components.elCol | typeof __VLS_components.ElCol | typeof __VLS_components['el-col'] | typeof __VLS_components.elCol | typeof __VLS_components.ElCol | typeof __VLS_components['el-col']} */
elCol;
// @ts-ignore
const __VLS_31 = __VLS_asFunctionalComponent1(__VLS_30, new __VLS_30({
    span: (12),
    ...{ class: "actions" },
}));
const __VLS_32 = __VLS_31({
    span: (12),
    ...{ class: "actions" },
}, ...__VLS_functionalComponentArgsRest(__VLS_31));
/** @type {__VLS_StyleScopedClasses['actions']} */ ;
const { default: __VLS_35 } = __VLS_33.slots;
let __VLS_36;
/** @ts-ignore @type { | typeof __VLS_components.elButton | typeof __VLS_components.ElButton | typeof __VLS_components['el-button'] | typeof __VLS_components.elButton | typeof __VLS_components.ElButton | typeof __VLS_components['el-button']} */
elButton;
// @ts-ignore
const __VLS_37 = __VLS_asFunctionalComponent1(__VLS_36, new __VLS_36({
    ...{ 'onClick': {} },
    type: "primary",
    icon: (__VLS_ctx.Download),
    disabled: (__VLS_ctx.store.selectedSkillIds.length === 0),
}));
const __VLS_38 = __VLS_37({
    ...{ 'onClick': {} },
    type: "primary",
    icon: (__VLS_ctx.Download),
    disabled: (__VLS_ctx.store.selectedSkillIds.length === 0),
}, ...__VLS_functionalComponentArgsRest(__VLS_37));
let __VLS_41;
const __VLS_42 = ({ click: {} },
    { onClick: (__VLS_ctx.handleExport) });
const { default: __VLS_43 } = __VLS_39.slots;
// @ts-ignore
[store, Download, handleExport,];
var __VLS_39;
var __VLS_40;
let __VLS_44;
/** @ts-ignore @type { | typeof __VLS_components.elButton | typeof __VLS_components.ElButton | typeof __VLS_components['el-button'] | typeof __VLS_components.elButton | typeof __VLS_components.ElButton | typeof __VLS_components['el-button']} */
elButton;
// @ts-ignore
const __VLS_45 = __VLS_asFunctionalComponent1(__VLS_44, new __VLS_44({
    ...{ 'onClick': {} },
    type: "success",
    icon: (__VLS_ctx.Check),
    disabled: (__VLS_ctx.store.selectedSkillIds.length === 0),
}));
const __VLS_46 = __VLS_45({
    ...{ 'onClick': {} },
    type: "success",
    icon: (__VLS_ctx.Check),
    disabled: (__VLS_ctx.store.selectedSkillIds.length === 0),
}, ...__VLS_functionalComponentArgsRest(__VLS_45));
let __VLS_49;
const __VLS_50 = ({ click: {} },
    { onClick: (__VLS_ctx.handleCopy) });
const { default: __VLS_51 } = __VLS_47.slots;
// @ts-ignore
[store, Check, handleCopy,];
var __VLS_47;
var __VLS_48;
if (__VLS_ctx.store.selectedSkillIds.length > 0) {
    let __VLS_52;
    /** @ts-ignore @type { | typeof __VLS_components.elButton | typeof __VLS_components.ElButton | typeof __VLS_components['el-button'] | typeof __VLS_components.elButton | typeof __VLS_components.ElButton | typeof __VLS_components['el-button']} */
    elButton;
    // @ts-ignore
    const __VLS_53 = __VLS_asFunctionalComponent1(__VLS_52, new __VLS_52({
        ...{ 'onClick': {} },
        icon: (__VLS_ctx.Close),
    }));
    const __VLS_54 = __VLS_53({
        ...{ 'onClick': {} },
        icon: (__VLS_ctx.Close),
    }, ...__VLS_functionalComponentArgsRest(__VLS_53));
    let __VLS_57;
    const __VLS_58 = ({ click: {} },
        { onClick: (__VLS_ctx.store.clearSelection) });
    const { default: __VLS_59 } = __VLS_55.slots;
    // @ts-ignore
    [store, store, Close,];
    var __VLS_55;
    var __VLS_56;
}
// @ts-ignore
[];
var __VLS_33;
// @ts-ignore
[];
var __VLS_3;
let __VLS_60;
/** @ts-ignore @type { | typeof __VLS_components.elCard | typeof __VLS_components.ElCard | typeof __VLS_components['el-card'] | typeof __VLS_components.elCard | typeof __VLS_components.ElCard | typeof __VLS_components['el-card']} */
elCard;
// @ts-ignore
const __VLS_61 = __VLS_asFunctionalComponent1(__VLS_60, new __VLS_60({
    ...{ class: "filter-card" },
    shadow: "never",
}));
const __VLS_62 = __VLS_61({
    ...{ class: "filter-card" },
    shadow: "never",
}, ...__VLS_functionalComponentArgsRest(__VLS_61));
/** @type {__VLS_StyleScopedClasses['filter-card']} */ ;
const { default: __VLS_65 } = __VLS_63.slots;
let __VLS_66;
/** @ts-ignore @type { | typeof __VLS_components.elRow | typeof __VLS_components.ElRow | typeof __VLS_components['el-row'] | typeof __VLS_components.elRow | typeof __VLS_components.ElRow | typeof __VLS_components['el-row']} */
elRow;
// @ts-ignore
const __VLS_67 = __VLS_asFunctionalComponent1(__VLS_66, new __VLS_66({
    gutter: (16),
    align: "middle",
}));
const __VLS_68 = __VLS_67({
    gutter: (16),
    align: "middle",
}, ...__VLS_functionalComponentArgsRest(__VLS_67));
const { default: __VLS_71 } = __VLS_69.slots;
let __VLS_72;
/** @ts-ignore @type { | typeof __VLS_components.elCol | typeof __VLS_components.ElCol | typeof __VLS_components['el-col'] | typeof __VLS_components.elCol | typeof __VLS_components.ElCol | typeof __VLS_components['el-col']} */
elCol;
// @ts-ignore
const __VLS_73 = __VLS_asFunctionalComponent1(__VLS_72, new __VLS_72({
    xs: (24),
    sm: (12),
    md: (8),
}));
const __VLS_74 = __VLS_73({
    xs: (24),
    sm: (12),
    md: (8),
}, ...__VLS_functionalComponentArgsRest(__VLS_73));
const { default: __VLS_77 } = __VLS_75.slots;
let __VLS_78;
/** @ts-ignore @type { | typeof __VLS_components.elInput | typeof __VLS_components.ElInput | typeof __VLS_components['el-input']} */
elInput;
// @ts-ignore
const __VLS_79 = __VLS_asFunctionalComponent1(__VLS_78, new __VLS_78({
    modelValue: (__VLS_ctx.store.searchQuery),
    placeholder: "搜索 Skill 名称、描述或标签...",
    prefixIcon: (__VLS_ctx.Search),
    clearable: true,
}));
const __VLS_80 = __VLS_79({
    modelValue: (__VLS_ctx.store.searchQuery),
    placeholder: "搜索 Skill 名称、描述或标签...",
    prefixIcon: (__VLS_ctx.Search),
    clearable: true,
}, ...__VLS_functionalComponentArgsRest(__VLS_79));
// @ts-ignore
[store, Search,];
var __VLS_75;
let __VLS_83;
/** @ts-ignore @type { | typeof __VLS_components.elCol | typeof __VLS_components.ElCol | typeof __VLS_components['el-col'] | typeof __VLS_components.elCol | typeof __VLS_components.ElCol | typeof __VLS_components['el-col']} */
elCol;
// @ts-ignore
const __VLS_84 = __VLS_asFunctionalComponent1(__VLS_83, new __VLS_83({
    xs: (24),
    sm: (12),
    md: (16),
}));
const __VLS_85 = __VLS_84({
    xs: (24),
    sm: (12),
    md: (16),
}, ...__VLS_functionalComponentArgsRest(__VLS_84));
const { default: __VLS_88 } = __VLS_86.slots;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "tag-filter" },
});
/** @type {__VLS_StyleScopedClasses['tag-filter']} */ ;
let __VLS_89;
/** @ts-ignore @type { | typeof __VLS_components.elIcon | typeof __VLS_components.ElIcon | typeof __VLS_components['el-icon'] | typeof __VLS_components.elIcon | typeof __VLS_components.ElIcon | typeof __VLS_components['el-icon']} */
elIcon;
// @ts-ignore
const __VLS_90 = __VLS_asFunctionalComponent1(__VLS_89, new __VLS_89({
    ...{ class: "filter-icon" },
}));
const __VLS_91 = __VLS_90({
    ...{ class: "filter-icon" },
}, ...__VLS_functionalComponentArgsRest(__VLS_90));
/** @type {__VLS_StyleScopedClasses['filter-icon']} */ ;
const { default: __VLS_94 } = __VLS_92.slots;
let __VLS_95;
/** @ts-ignore @type { | typeof __VLS_components.Filter} */
Filter;
// @ts-ignore
const __VLS_96 = __VLS_asFunctionalComponent1(__VLS_95, new __VLS_95({}));
const __VLS_97 = __VLS_96({}, ...__VLS_functionalComponentArgsRest(__VLS_96));
// @ts-ignore
[];
var __VLS_92;
for (const [tag] of __VLS_vFor((__VLS_ctx.store.allTags))) {
    let __VLS_100;
    /** @ts-ignore @type { | typeof __VLS_components.elCheckTag | typeof __VLS_components.ElCheckTag | typeof __VLS_components['el-check-tag'] | typeof __VLS_components.elCheckTag | typeof __VLS_components.ElCheckTag | typeof __VLS_components['el-check-tag']} */
    elCheckTag;
    // @ts-ignore
    const __VLS_101 = __VLS_asFunctionalComponent1(__VLS_100, new __VLS_100({
        ...{ 'onChange': {} },
        key: (tag),
        checked: (__VLS_ctx.store.selectedTags.includes(tag)),
        ...{ class: "filter-tag" },
    }));
    const __VLS_102 = __VLS_101({
        ...{ 'onChange': {} },
        key: (tag),
        checked: (__VLS_ctx.store.selectedTags.includes(tag)),
        ...{ class: "filter-tag" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_101));
    let __VLS_105;
    const __VLS_106 = ({ change: {} },
        { onChange: (...[$event]) => {
                __VLS_ctx.handleTagClick(tag);
                // @ts-ignore
                [store, store, handleTagClick,];
            } });
    /** @type {__VLS_StyleScopedClasses['filter-tag']} */ ;
    const { default: __VLS_107 } = __VLS_103.slots;
    (tag);
    // @ts-ignore
    [];
    var __VLS_103;
    var __VLS_104;
    // @ts-ignore
    [];
}
if (__VLS_ctx.store.selectedTags.length > 0 || __VLS_ctx.store.searchQuery) {
    let __VLS_108;
    /** @ts-ignore @type { | typeof __VLS_components.elButton | typeof __VLS_components.ElButton | typeof __VLS_components['el-button'] | typeof __VLS_components.elButton | typeof __VLS_components.ElButton | typeof __VLS_components['el-button']} */
    elButton;
    // @ts-ignore
    const __VLS_109 = __VLS_asFunctionalComponent1(__VLS_108, new __VLS_108({
        ...{ 'onClick': {} },
        link: true,
        size: "small",
        type: "info",
    }));
    const __VLS_110 = __VLS_109({
        ...{ 'onClick': {} },
        link: true,
        size: "small",
        type: "info",
    }, ...__VLS_functionalComponentArgsRest(__VLS_109));
    let __VLS_113;
    const __VLS_114 = ({ click: {} },
        { onClick: (__VLS_ctx.clearFilters) });
    const { default: __VLS_115 } = __VLS_111.slots;
    // @ts-ignore
    [store, store, clearFilters,];
    var __VLS_111;
    var __VLS_112;
}
// @ts-ignore
[];
var __VLS_86;
// @ts-ignore
[];
var __VLS_69;
// @ts-ignore
[];
var __VLS_63;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "batch-bar" },
});
/** @type {__VLS_StyleScopedClasses['batch-bar']} */ ;
let __VLS_116;
/** @ts-ignore @type { | typeof __VLS_components.elButton | typeof __VLS_components.ElButton | typeof __VLS_components['el-button'] | typeof __VLS_components.elButton | typeof __VLS_components.ElButton | typeof __VLS_components['el-button']} */
elButton;
// @ts-ignore
const __VLS_117 = __VLS_asFunctionalComponent1(__VLS_116, new __VLS_116({
    ...{ 'onClick': {} },
    link: true,
    type: "primary",
}));
const __VLS_118 = __VLS_117({
    ...{ 'onClick': {} },
    link: true,
    type: "primary",
}, ...__VLS_functionalComponentArgsRest(__VLS_117));
let __VLS_121;
const __VLS_122 = ({ click: {} },
    { onClick: (__VLS_ctx.store.selectAllVisible) });
const { default: __VLS_123 } = __VLS_119.slots;
(__VLS_ctx.store.filteredSkills.every(s => __VLS_ctx.store.selectedSkillIds.includes(s.id)) ? '取消全选' : '全选当前');
// @ts-ignore
[store, store, store,];
var __VLS_119;
var __VLS_120;
__VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
    ...{ class: "hint" },
});
/** @type {__VLS_StyleScopedClasses['hint']} */ ;
if (__VLS_ctx.store.filteredSkills.length === 0) {
    let __VLS_124;
    /** @ts-ignore @type { | typeof __VLS_components.elEmpty | typeof __VLS_components.ElEmpty | typeof __VLS_components['el-empty']} */
    elEmpty;
    // @ts-ignore
    const __VLS_125 = __VLS_asFunctionalComponent1(__VLS_124, new __VLS_124({
        description: "没有找到匹配的 Skill",
    }));
    const __VLS_126 = __VLS_125({
        description: "没有找到匹配的 Skill",
    }, ...__VLS_functionalComponentArgsRest(__VLS_125));
}
else {
    let __VLS_129;
    /** @ts-ignore @type { | typeof __VLS_components.elRow | typeof __VLS_components.ElRow | typeof __VLS_components['el-row'] | typeof __VLS_components.elRow | typeof __VLS_components.ElRow | typeof __VLS_components['el-row']} */
    elRow;
    // @ts-ignore
    const __VLS_130 = __VLS_asFunctionalComponent1(__VLS_129, new __VLS_129({
        gutter: (16),
    }));
    const __VLS_131 = __VLS_130({
        gutter: (16),
    }, ...__VLS_functionalComponentArgsRest(__VLS_130));
    const { default: __VLS_134 } = __VLS_132.slots;
    for (const [skill] of __VLS_vFor((__VLS_ctx.store.filteredSkills))) {
        let __VLS_135;
        /** @ts-ignore @type { | typeof __VLS_components.elCol | typeof __VLS_components.ElCol | typeof __VLS_components['el-col'] | typeof __VLS_components.elCol | typeof __VLS_components.ElCol | typeof __VLS_components['el-col']} */
        elCol;
        // @ts-ignore
        const __VLS_136 = __VLS_asFunctionalComponent1(__VLS_135, new __VLS_135({
            key: (skill.id),
            xs: (24),
            sm: (12),
            md: (8),
            lg: (6),
            ...{ class: "skill-col" },
        }));
        const __VLS_137 = __VLS_136({
            key: (skill.id),
            xs: (24),
            sm: (12),
            md: (8),
            lg: (6),
            ...{ class: "skill-col" },
        }, ...__VLS_functionalComponentArgsRest(__VLS_136));
        /** @type {__VLS_StyleScopedClasses['skill-col']} */ ;
        const { default: __VLS_140 } = __VLS_138.slots;
        const __VLS_141 = SkillCard;
        // @ts-ignore
        const __VLS_142 = __VLS_asFunctionalComponent1(__VLS_141, new __VLS_141({
            skill: (skill),
        }));
        const __VLS_143 = __VLS_142({
            skill: (skill),
        }, ...__VLS_functionalComponentArgsRest(__VLS_142));
        // @ts-ignore
        [store, store,];
        var __VLS_138;
        // @ts-ignore
        [];
    }
    // @ts-ignore
    [];
    var __VLS_132;
}
// @ts-ignore
[];
const __VLS_export = (await import('vue')).defineComponent({});
export default {};
