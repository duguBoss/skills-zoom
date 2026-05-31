import { computed } from 'vue';
import { useRouter } from 'vue-router';
import { useSkillsStore } from '@/stores/skills';
import { useFavoritesStore } from '@/stores/favorites';
import { Link, Calendar, User, Check, Star, StarFilled, View } from '@element-plus/icons-vue';
const props = defineProps();
const router = useRouter();
const store = useSkillsStore();
const favoritesStore = useFavoritesStore();
const isSelected = computed(() => store.selectedSkillIds.includes(props.skill.id));
const isFavorited = computed(() => favoritesStore.isFavorited(props.skill.id));
function toggleSelect() {
    store.toggleSkillSelection(props.skill.id);
}
function openRepo() {
    window.open(props.skill.repoUrl, '_blank');
}
function goDetail() {
    router.push(`/skill/${props.skill.id}`);
}
function toggleFavorite(e) {
    e.stopPropagation();
    favoritesStore.toggleFavorite(props.skill.id);
}
const __VLS_ctx = {
    ...{},
    ...{},
    ...{},
    ...{},
};
let __VLS_components;
let __VLS_intrinsics;
let __VLS_directives;
/** @type {__VLS_StyleScopedClasses['skill-card']} */ ;
/** @type {__VLS_StyleScopedClasses['skill-card']} */ ;
/** @type {__VLS_StyleScopedClasses['meta']} */ ;
let __VLS_0;
/** @ts-ignore @type { | typeof __VLS_components.elCard | typeof __VLS_components.ElCard | typeof __VLS_components['el-card'] | typeof __VLS_components.elCard | typeof __VLS_components.ElCard | typeof __VLS_components['el-card']} */
elCard;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent1(__VLS_0, new __VLS_0({
    ...{ 'onClick': {} },
    ...{ class: (['skill-card', { 'is-selected': __VLS_ctx.isSelected }]) },
    shadow: "hover",
}));
const __VLS_2 = __VLS_1({
    ...{ 'onClick': {} },
    ...{ class: (['skill-card', { 'is-selected': __VLS_ctx.isSelected }]) },
    shadow: "hover",
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
let __VLS_5;
const __VLS_6 = ({ click: {} },
    { onClick: (__VLS_ctx.toggleSelect) });
var __VLS_7;
/** @type {__VLS_StyleScopedClasses['skill-card']} */ ;
/** @type {__VLS_StyleScopedClasses['is-selected']} */ ;
const { default: __VLS_8 } = __VLS_3.slots;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "card-header" },
});
/** @type {__VLS_StyleScopedClasses['card-header']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "title-row" },
});
/** @type {__VLS_StyleScopedClasses['title-row']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.h3, __VLS_intrinsics.h3)({
    ...{ class: "skill-name" },
});
/** @type {__VLS_StyleScopedClasses['skill-name']} */ ;
(__VLS_ctx.skill.name);
if (__VLS_ctx.isSelected) {
    let __VLS_9;
    /** @ts-ignore @type { | typeof __VLS_components.elTag | typeof __VLS_components.ElTag | typeof __VLS_components['el-tag'] | typeof __VLS_components.elTag | typeof __VLS_components.ElTag | typeof __VLS_components['el-tag']} */
    elTag;
    // @ts-ignore
    const __VLS_10 = __VLS_asFunctionalComponent1(__VLS_9, new __VLS_9({
        type: "success",
        size: "small",
        effect: "dark",
    }));
    const __VLS_11 = __VLS_10({
        type: "success",
        size: "small",
        effect: "dark",
    }, ...__VLS_functionalComponentArgsRest(__VLS_10));
    const { default: __VLS_14 } = __VLS_12.slots;
    let __VLS_15;
    /** @ts-ignore @type { | typeof __VLS_components.elIcon | typeof __VLS_components.ElIcon | typeof __VLS_components['el-icon'] | typeof __VLS_components.elIcon | typeof __VLS_components.ElIcon | typeof __VLS_components['el-icon']} */
    elIcon;
    // @ts-ignore
    const __VLS_16 = __VLS_asFunctionalComponent1(__VLS_15, new __VLS_15({}));
    const __VLS_17 = __VLS_16({}, ...__VLS_functionalComponentArgsRest(__VLS_16));
    const { default: __VLS_20 } = __VLS_18.slots;
    let __VLS_21;
    /** @ts-ignore @type { | typeof __VLS_components.Check} */
    Check;
    // @ts-ignore
    const __VLS_22 = __VLS_asFunctionalComponent1(__VLS_21, new __VLS_21({}));
    const __VLS_23 = __VLS_22({}, ...__VLS_functionalComponentArgsRest(__VLS_22));
    // @ts-ignore
    [isSelected, isSelected, toggleSelect, skill,];
    var __VLS_18;
    // @ts-ignore
    [];
    var __VLS_12;
}
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "header-actions" },
});
/** @type {__VLS_StyleScopedClasses['header-actions']} */ ;
let __VLS_26;
/** @ts-ignore @type { | typeof __VLS_components.elButton | typeof __VLS_components.ElButton | typeof __VLS_components['el-button'] | typeof __VLS_components.elButton | typeof __VLS_components.ElButton | typeof __VLS_components['el-button']} */
elButton;
// @ts-ignore
const __VLS_27 = __VLS_asFunctionalComponent1(__VLS_26, new __VLS_26({
    ...{ 'onClick': {} },
    link: true,
    type: (__VLS_ctx.isFavorited ? 'warning' : 'info'),
    size: "small",
    title: (__VLS_ctx.isFavorited ? '取消收藏' : '收藏'),
}));
const __VLS_28 = __VLS_27({
    ...{ 'onClick': {} },
    link: true,
    type: (__VLS_ctx.isFavorited ? 'warning' : 'info'),
    size: "small",
    title: (__VLS_ctx.isFavorited ? '取消收藏' : '收藏'),
}, ...__VLS_functionalComponentArgsRest(__VLS_27));
let __VLS_31;
const __VLS_32 = ({ click: {} },
    { onClick: (__VLS_ctx.toggleFavorite) });
const { default: __VLS_33 } = __VLS_29.slots;
let __VLS_34;
/** @ts-ignore @type { | typeof __VLS_components.elIcon | typeof __VLS_components.ElIcon | typeof __VLS_components['el-icon'] | typeof __VLS_components.elIcon | typeof __VLS_components.ElIcon | typeof __VLS_components['el-icon']} */
elIcon;
// @ts-ignore
const __VLS_35 = __VLS_asFunctionalComponent1(__VLS_34, new __VLS_34({}));
const __VLS_36 = __VLS_35({}, ...__VLS_functionalComponentArgsRest(__VLS_35));
const { default: __VLS_39 } = __VLS_37.slots;
const __VLS_40 = (__VLS_ctx.isFavorited ? __VLS_ctx.StarFilled : __VLS_ctx.Star);
// @ts-ignore
const __VLS_41 = __VLS_asFunctionalComponent1(__VLS_40, new __VLS_40({}));
const __VLS_42 = __VLS_41({}, ...__VLS_functionalComponentArgsRest(__VLS_41));
// @ts-ignore
[isFavorited, isFavorited, isFavorited, toggleFavorite, StarFilled, Star,];
var __VLS_37;
// @ts-ignore
[];
var __VLS_29;
var __VLS_30;
let __VLS_45;
/** @ts-ignore @type { | typeof __VLS_components.elButton | typeof __VLS_components.ElButton | typeof __VLS_components['el-button'] | typeof __VLS_components.elButton | typeof __VLS_components.ElButton | typeof __VLS_components['el-button']} */
elButton;
// @ts-ignore
const __VLS_46 = __VLS_asFunctionalComponent1(__VLS_45, new __VLS_45({
    ...{ 'onClick': {} },
    link: true,
    type: "primary",
    size: "small",
}));
const __VLS_47 = __VLS_46({
    ...{ 'onClick': {} },
    link: true,
    type: "primary",
    size: "small",
}, ...__VLS_functionalComponentArgsRest(__VLS_46));
let __VLS_50;
const __VLS_51 = ({ click: {} },
    { onClick: (__VLS_ctx.openRepo) });
const { default: __VLS_52 } = __VLS_48.slots;
let __VLS_53;
/** @ts-ignore @type { | typeof __VLS_components.elIcon | typeof __VLS_components.ElIcon | typeof __VLS_components['el-icon'] | typeof __VLS_components.elIcon | typeof __VLS_components.ElIcon | typeof __VLS_components['el-icon']} */
elIcon;
// @ts-ignore
const __VLS_54 = __VLS_asFunctionalComponent1(__VLS_53, new __VLS_53({}));
const __VLS_55 = __VLS_54({}, ...__VLS_functionalComponentArgsRest(__VLS_54));
const { default: __VLS_58 } = __VLS_56.slots;
let __VLS_59;
/** @ts-ignore @type { | typeof __VLS_components.Link} */
Link;
// @ts-ignore
const __VLS_60 = __VLS_asFunctionalComponent1(__VLS_59, new __VLS_59({}));
const __VLS_61 = __VLS_60({}, ...__VLS_functionalComponentArgsRest(__VLS_60));
// @ts-ignore
[openRepo,];
var __VLS_56;
// @ts-ignore
[];
var __VLS_48;
var __VLS_49;
__VLS_asFunctionalElement1(__VLS_intrinsics.p, __VLS_intrinsics.p)({
    ...{ class: "description" },
});
/** @type {__VLS_StyleScopedClasses['description']} */ ;
(__VLS_ctx.skill.description);
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "meta" },
});
/** @type {__VLS_StyleScopedClasses['meta']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({});
let __VLS_64;
/** @ts-ignore @type { | typeof __VLS_components.elIcon | typeof __VLS_components.ElIcon | typeof __VLS_components['el-icon'] | typeof __VLS_components.elIcon | typeof __VLS_components.ElIcon | typeof __VLS_components['el-icon']} */
elIcon;
// @ts-ignore
const __VLS_65 = __VLS_asFunctionalComponent1(__VLS_64, new __VLS_64({}));
const __VLS_66 = __VLS_65({}, ...__VLS_functionalComponentArgsRest(__VLS_65));
const { default: __VLS_69 } = __VLS_67.slots;
let __VLS_70;
/** @ts-ignore @type { | typeof __VLS_components.User} */
User;
// @ts-ignore
const __VLS_71 = __VLS_asFunctionalComponent1(__VLS_70, new __VLS_70({}));
const __VLS_72 = __VLS_71({}, ...__VLS_functionalComponentArgsRest(__VLS_71));
// @ts-ignore
[skill,];
var __VLS_67;
(__VLS_ctx.skill.author);
__VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({});
let __VLS_75;
/** @ts-ignore @type { | typeof __VLS_components.elIcon | typeof __VLS_components.ElIcon | typeof __VLS_components['el-icon'] | typeof __VLS_components.elIcon | typeof __VLS_components.ElIcon | typeof __VLS_components['el-icon']} */
elIcon;
// @ts-ignore
const __VLS_76 = __VLS_asFunctionalComponent1(__VLS_75, new __VLS_75({}));
const __VLS_77 = __VLS_76({}, ...__VLS_functionalComponentArgsRest(__VLS_76));
const { default: __VLS_80 } = __VLS_78.slots;
let __VLS_81;
/** @ts-ignore @type { | typeof __VLS_components.Calendar} */
Calendar;
// @ts-ignore
const __VLS_82 = __VLS_asFunctionalComponent1(__VLS_81, new __VLS_81({}));
const __VLS_83 = __VLS_82({}, ...__VLS_functionalComponentArgsRest(__VLS_82));
// @ts-ignore
[skill,];
var __VLS_78;
(__VLS_ctx.skill.addedAt);
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "tags" },
});
/** @type {__VLS_StyleScopedClasses['tags']} */ ;
for (const [tag] of __VLS_vFor((__VLS_ctx.skill.tags))) {
    let __VLS_86;
    /** @ts-ignore @type { | typeof __VLS_components.elTag | typeof __VLS_components.ElTag | typeof __VLS_components['el-tag'] | typeof __VLS_components.elTag | typeof __VLS_components.ElTag | typeof __VLS_components['el-tag']} */
    elTag;
    // @ts-ignore
    const __VLS_87 = __VLS_asFunctionalComponent1(__VLS_86, new __VLS_86({
        key: (tag),
        size: "small",
        type: (__VLS_ctx.store.selectedTags.includes(tag) ? 'primary' : 'info'),
        effect: "plain",
        ...{ class: "tag-item" },
    }));
    const __VLS_88 = __VLS_87({
        key: (tag),
        size: "small",
        type: (__VLS_ctx.store.selectedTags.includes(tag) ? 'primary' : 'info'),
        effect: "plain",
        ...{ class: "tag-item" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_87));
    /** @type {__VLS_StyleScopedClasses['tag-item']} */ ;
    const { default: __VLS_91 } = __VLS_89.slots;
    (tag);
    // @ts-ignore
    [skill, skill, store,];
    var __VLS_89;
    // @ts-ignore
    [];
}
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "card-footer" },
});
/** @type {__VLS_StyleScopedClasses['card-footer']} */ ;
let __VLS_92;
/** @ts-ignore @type { | typeof __VLS_components.elButton | typeof __VLS_components.ElButton | typeof __VLS_components['el-button'] | typeof __VLS_components.elButton | typeof __VLS_components.ElButton | typeof __VLS_components['el-button']} */
elButton;
// @ts-ignore
const __VLS_93 = __VLS_asFunctionalComponent1(__VLS_92, new __VLS_92({
    ...{ 'onClick': {} },
    link: true,
    type: "primary",
    size: "small",
}));
const __VLS_94 = __VLS_93({
    ...{ 'onClick': {} },
    link: true,
    type: "primary",
    size: "small",
}, ...__VLS_functionalComponentArgsRest(__VLS_93));
let __VLS_97;
const __VLS_98 = ({ click: {} },
    { onClick: (__VLS_ctx.goDetail) });
const { default: __VLS_99 } = __VLS_95.slots;
let __VLS_100;
/** @ts-ignore @type { | typeof __VLS_components.elIcon | typeof __VLS_components.ElIcon | typeof __VLS_components['el-icon'] | typeof __VLS_components.elIcon | typeof __VLS_components.ElIcon | typeof __VLS_components['el-icon']} */
elIcon;
// @ts-ignore
const __VLS_101 = __VLS_asFunctionalComponent1(__VLS_100, new __VLS_100({}));
const __VLS_102 = __VLS_101({}, ...__VLS_functionalComponentArgsRest(__VLS_101));
const { default: __VLS_105 } = __VLS_103.slots;
let __VLS_106;
/** @ts-ignore @type { | typeof __VLS_components.View} */
View;
// @ts-ignore
const __VLS_107 = __VLS_asFunctionalComponent1(__VLS_106, new __VLS_106({}));
const __VLS_108 = __VLS_107({}, ...__VLS_functionalComponentArgsRest(__VLS_107));
// @ts-ignore
[goDetail,];
var __VLS_103;
// @ts-ignore
[];
var __VLS_95;
var __VLS_96;
// @ts-ignore
[];
var __VLS_3;
var __VLS_4;
// @ts-ignore
[];
const __VLS_export = (await import('vue')).defineComponent({
    __typeProps: {},
});
export default {};
