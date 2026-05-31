import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useSkillsStore } from '@/stores/skills';
import { useFavoritesStore } from '@/stores/favorites';
import { ArrowLeft, Link, User, Calendar, Star, StarFilled, CollectionTag } from '@element-plus/icons-vue';
import { ElMessage } from 'element-plus';
const route = useRoute();
const router = useRouter();
const store = useSkillsStore();
const favoritesStore = useFavoritesStore();
const skillId = computed(() => route.params.id);
const skill = computed(() => store.skills.find(s => s.id === skillId.value));
const isFavorited = computed(() => favoritesStore.isFavorited(skillId.value));
function goBack() {
    router.back();
}
function openRepo() {
    if (skill.value) {
        window.open(skill.value.repoUrl, '_blank');
    }
}
function toggleFavorite() {
    if (!skill.value)
        return;
    favoritesStore.toggleFavorite(skill.value.id);
    if (isFavorited.value) {
        ElMessage.success('已收藏');
    }
    else {
        ElMessage.info('已取消收藏');
    }
}
function handleTagClick(tag) {
    store.selectedTags = [tag];
    router.push('/');
}
const __VLS_ctx = {
    ...{},
    ...{},
};
let __VLS_components;
let __VLS_intrinsics;
let __VLS_directives;
/** @type {__VLS_StyleScopedClasses['detail-tag']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "detail-view" },
});
/** @type {__VLS_StyleScopedClasses['detail-view']} */ ;
let __VLS_0;
/** @ts-ignore @type { | typeof __VLS_components.elButton | typeof __VLS_components.ElButton | typeof __VLS_components['el-button'] | typeof __VLS_components.elButton | typeof __VLS_components.ElButton | typeof __VLS_components['el-button']} */
elButton;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent1(__VLS_0, new __VLS_0({
    ...{ 'onClick': {} },
    link: true,
    type: "primary",
    icon: (__VLS_ctx.ArrowLeft),
    ...{ class: "back-btn" },
}));
const __VLS_2 = __VLS_1({
    ...{ 'onClick': {} },
    link: true,
    type: "primary",
    icon: (__VLS_ctx.ArrowLeft),
    ...{ class: "back-btn" },
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
let __VLS_5;
const __VLS_6 = ({ click: {} },
    { onClick: (__VLS_ctx.goBack) });
/** @type {__VLS_StyleScopedClasses['back-btn']} */ ;
const { default: __VLS_7 } = __VLS_3.slots;
// @ts-ignore
[ArrowLeft, goBack,];
var __VLS_3;
var __VLS_4;
if (!__VLS_ctx.skill) {
    let __VLS_8;
    /** @ts-ignore @type { | typeof __VLS_components.elEmpty | typeof __VLS_components.ElEmpty | typeof __VLS_components['el-empty']} */
    elEmpty;
    // @ts-ignore
    const __VLS_9 = __VLS_asFunctionalComponent1(__VLS_8, new __VLS_8({
        description: "Skill 不存在",
    }));
    const __VLS_10 = __VLS_9({
        description: "Skill 不存在",
    }, ...__VLS_functionalComponentArgsRest(__VLS_9));
}
else {
    let __VLS_13;
    /** @ts-ignore @type { | typeof __VLS_components.elCard | typeof __VLS_components.ElCard | typeof __VLS_components['el-card'] | typeof __VLS_components.elCard | typeof __VLS_components.ElCard | typeof __VLS_components['el-card']} */
    elCard;
    // @ts-ignore
    const __VLS_14 = __VLS_asFunctionalComponent1(__VLS_13, new __VLS_13({
        ...{ class: "detail-card" },
        shadow: "never",
    }));
    const __VLS_15 = __VLS_14({
        ...{ class: "detail-card" },
        shadow: "never",
    }, ...__VLS_functionalComponentArgsRest(__VLS_14));
    /** @type {__VLS_StyleScopedClasses['detail-card']} */ ;
    const { default: __VLS_18 } = __VLS_16.slots;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "detail-header" },
    });
    /** @type {__VLS_StyleScopedClasses['detail-header']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "title-section" },
    });
    /** @type {__VLS_StyleScopedClasses['title-section']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.h1, __VLS_intrinsics.h1)({
        ...{ class: "skill-title" },
    });
    /** @type {__VLS_StyleScopedClasses['skill-title']} */ ;
    (__VLS_ctx.skill.name);
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "actions" },
    });
    /** @type {__VLS_StyleScopedClasses['actions']} */ ;
    let __VLS_19;
    /** @ts-ignore @type { | typeof __VLS_components.elButton | typeof __VLS_components.ElButton | typeof __VLS_components['el-button'] | typeof __VLS_components.elButton | typeof __VLS_components.ElButton | typeof __VLS_components['el-button']} */
    elButton;
    // @ts-ignore
    const __VLS_20 = __VLS_asFunctionalComponent1(__VLS_19, new __VLS_19({
        ...{ 'onClick': {} },
        type: (__VLS_ctx.isFavorited ? 'warning' : 'default'),
        icon: (__VLS_ctx.isFavorited ? __VLS_ctx.StarFilled : __VLS_ctx.Star),
    }));
    const __VLS_21 = __VLS_20({
        ...{ 'onClick': {} },
        type: (__VLS_ctx.isFavorited ? 'warning' : 'default'),
        icon: (__VLS_ctx.isFavorited ? __VLS_ctx.StarFilled : __VLS_ctx.Star),
    }, ...__VLS_functionalComponentArgsRest(__VLS_20));
    let __VLS_24;
    const __VLS_25 = ({ click: {} },
        { onClick: (__VLS_ctx.toggleFavorite) });
    const { default: __VLS_26 } = __VLS_22.slots;
    (__VLS_ctx.isFavorited ? '已收藏' : '收藏');
    // @ts-ignore
    [skill, skill, isFavorited, isFavorited, isFavorited, StarFilled, Star, toggleFavorite,];
    var __VLS_22;
    var __VLS_23;
    let __VLS_27;
    /** @ts-ignore @type { | typeof __VLS_components.elButton | typeof __VLS_components.ElButton | typeof __VLS_components['el-button'] | typeof __VLS_components.elButton | typeof __VLS_components.ElButton | typeof __VLS_components['el-button']} */
    elButton;
    // @ts-ignore
    const __VLS_28 = __VLS_asFunctionalComponent1(__VLS_27, new __VLS_27({
        ...{ 'onClick': {} },
        type: "primary",
        icon: (__VLS_ctx.Link),
    }));
    const __VLS_29 = __VLS_28({
        ...{ 'onClick': {} },
        type: "primary",
        icon: (__VLS_ctx.Link),
    }, ...__VLS_functionalComponentArgsRest(__VLS_28));
    let __VLS_32;
    const __VLS_33 = ({ click: {} },
        { onClick: (__VLS_ctx.openRepo) });
    const { default: __VLS_34 } = __VLS_30.slots;
    // @ts-ignore
    [Link, openRepo,];
    var __VLS_30;
    var __VLS_31;
    __VLS_asFunctionalElement1(__VLS_intrinsics.p, __VLS_intrinsics.p)({
        ...{ class: "detail-description" },
    });
    /** @type {__VLS_StyleScopedClasses['detail-description']} */ ;
    (__VLS_ctx.skill.description);
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "detail-meta" },
    });
    /** @type {__VLS_StyleScopedClasses['detail-meta']} */ ;
    let __VLS_35;
    /** @ts-ignore @type { | typeof __VLS_components.elTag | typeof __VLS_components.ElTag | typeof __VLS_components['el-tag'] | typeof __VLS_components.elTag | typeof __VLS_components.ElTag | typeof __VLS_components['el-tag']} */
    elTag;
    // @ts-ignore
    const __VLS_36 = __VLS_asFunctionalComponent1(__VLS_35, new __VLS_35({
        size: "large",
        effect: "plain",
    }));
    const __VLS_37 = __VLS_36({
        size: "large",
        effect: "plain",
    }, ...__VLS_functionalComponentArgsRest(__VLS_36));
    const { default: __VLS_40 } = __VLS_38.slots;
    let __VLS_41;
    /** @ts-ignore @type { | typeof __VLS_components.elIcon | typeof __VLS_components.ElIcon | typeof __VLS_components['el-icon'] | typeof __VLS_components.elIcon | typeof __VLS_components.ElIcon | typeof __VLS_components['el-icon']} */
    elIcon;
    // @ts-ignore
    const __VLS_42 = __VLS_asFunctionalComponent1(__VLS_41, new __VLS_41({}));
    const __VLS_43 = __VLS_42({}, ...__VLS_functionalComponentArgsRest(__VLS_42));
    const { default: __VLS_46 } = __VLS_44.slots;
    let __VLS_47;
    /** @ts-ignore @type { | typeof __VLS_components.User} */
    User;
    // @ts-ignore
    const __VLS_48 = __VLS_asFunctionalComponent1(__VLS_47, new __VLS_47({}));
    const __VLS_49 = __VLS_48({}, ...__VLS_functionalComponentArgsRest(__VLS_48));
    // @ts-ignore
    [skill,];
    var __VLS_44;
    (__VLS_ctx.skill.author);
    // @ts-ignore
    [skill,];
    var __VLS_38;
    let __VLS_52;
    /** @ts-ignore @type { | typeof __VLS_components.elTag | typeof __VLS_components.ElTag | typeof __VLS_components['el-tag'] | typeof __VLS_components.elTag | typeof __VLS_components.ElTag | typeof __VLS_components['el-tag']} */
    elTag;
    // @ts-ignore
    const __VLS_53 = __VLS_asFunctionalComponent1(__VLS_52, new __VLS_52({
        size: "large",
        effect: "plain",
    }));
    const __VLS_54 = __VLS_53({
        size: "large",
        effect: "plain",
    }, ...__VLS_functionalComponentArgsRest(__VLS_53));
    const { default: __VLS_57 } = __VLS_55.slots;
    let __VLS_58;
    /** @ts-ignore @type { | typeof __VLS_components.elIcon | typeof __VLS_components.ElIcon | typeof __VLS_components['el-icon'] | typeof __VLS_components.elIcon | typeof __VLS_components.ElIcon | typeof __VLS_components['el-icon']} */
    elIcon;
    // @ts-ignore
    const __VLS_59 = __VLS_asFunctionalComponent1(__VLS_58, new __VLS_58({}));
    const __VLS_60 = __VLS_59({}, ...__VLS_functionalComponentArgsRest(__VLS_59));
    const { default: __VLS_63 } = __VLS_61.slots;
    let __VLS_64;
    /** @ts-ignore @type { | typeof __VLS_components.Calendar} */
    Calendar;
    // @ts-ignore
    const __VLS_65 = __VLS_asFunctionalComponent1(__VLS_64, new __VLS_64({}));
    const __VLS_66 = __VLS_65({}, ...__VLS_functionalComponentArgsRest(__VLS_65));
    // @ts-ignore
    [];
    var __VLS_61;
    (__VLS_ctx.skill.addedAt);
    // @ts-ignore
    [skill,];
    var __VLS_55;
    let __VLS_69;
    /** @ts-ignore @type { | typeof __VLS_components.elDivider | typeof __VLS_components.ElDivider | typeof __VLS_components['el-divider']} */
    elDivider;
    // @ts-ignore
    const __VLS_70 = __VLS_asFunctionalComponent1(__VLS_69, new __VLS_69({}));
    const __VLS_71 = __VLS_70({}, ...__VLS_functionalComponentArgsRest(__VLS_70));
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "detail-section" },
    });
    /** @type {__VLS_StyleScopedClasses['detail-section']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.h3, __VLS_intrinsics.h3)({});
    let __VLS_74;
    /** @ts-ignore @type { | typeof __VLS_components.elIcon | typeof __VLS_components.ElIcon | typeof __VLS_components['el-icon'] | typeof __VLS_components.elIcon | typeof __VLS_components.ElIcon | typeof __VLS_components['el-icon']} */
    elIcon;
    // @ts-ignore
    const __VLS_75 = __VLS_asFunctionalComponent1(__VLS_74, new __VLS_74({}));
    const __VLS_76 = __VLS_75({}, ...__VLS_functionalComponentArgsRest(__VLS_75));
    const { default: __VLS_79 } = __VLS_77.slots;
    let __VLS_80;
    /** @ts-ignore @type { | typeof __VLS_components.CollectionTag} */
    CollectionTag;
    // @ts-ignore
    const __VLS_81 = __VLS_asFunctionalComponent1(__VLS_80, new __VLS_80({}));
    const __VLS_82 = __VLS_81({}, ...__VLS_functionalComponentArgsRest(__VLS_81));
    // @ts-ignore
    [];
    var __VLS_77;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "tags-row" },
    });
    /** @type {__VLS_StyleScopedClasses['tags-row']} */ ;
    for (const [tag] of __VLS_vFor((__VLS_ctx.skill.tags))) {
        let __VLS_85;
        /** @ts-ignore @type { | typeof __VLS_components.elTag | typeof __VLS_components.ElTag | typeof __VLS_components['el-tag'] | typeof __VLS_components.elTag | typeof __VLS_components.ElTag | typeof __VLS_components['el-tag']} */
        elTag;
        // @ts-ignore
        const __VLS_86 = __VLS_asFunctionalComponent1(__VLS_85, new __VLS_85({
            ...{ 'onClick': {} },
            key: (tag),
            size: "large",
            type: "primary",
            effect: "plain",
            ...{ class: "detail-tag" },
        }));
        const __VLS_87 = __VLS_86({
            ...{ 'onClick': {} },
            key: (tag),
            size: "large",
            type: "primary",
            effect: "plain",
            ...{ class: "detail-tag" },
        }, ...__VLS_functionalComponentArgsRest(__VLS_86));
        let __VLS_90;
        const __VLS_91 = ({ click: {} },
            { onClick: (...[$event]) => {
                    if (!!(!__VLS_ctx.skill))
                        return;
                    __VLS_ctx.handleTagClick(tag);
                    // @ts-ignore
                    [skill, handleTagClick,];
                } });
        /** @type {__VLS_StyleScopedClasses['detail-tag']} */ ;
        const { default: __VLS_92 } = __VLS_88.slots;
        (tag);
        // @ts-ignore
        [];
        var __VLS_88;
        var __VLS_89;
        // @ts-ignore
        [];
    }
    let __VLS_93;
    /** @ts-ignore @type { | typeof __VLS_components.elDivider | typeof __VLS_components.ElDivider | typeof __VLS_components['el-divider']} */
    elDivider;
    // @ts-ignore
    const __VLS_94 = __VLS_asFunctionalComponent1(__VLS_93, new __VLS_93({}));
    const __VLS_95 = __VLS_94({}, ...__VLS_functionalComponentArgsRest(__VLS_94));
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "detail-section" },
    });
    /** @type {__VLS_StyleScopedClasses['detail-section']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.h3, __VLS_intrinsics.h3)({});
    let __VLS_98;
    /** @ts-ignore @type { | typeof __VLS_components.elLink | typeof __VLS_components.ElLink | typeof __VLS_components['el-link'] | typeof __VLS_components.elLink | typeof __VLS_components.ElLink | typeof __VLS_components['el-link']} */
    elLink;
    // @ts-ignore
    const __VLS_99 = __VLS_asFunctionalComponent1(__VLS_98, new __VLS_98({
        type: "primary",
        href: (__VLS_ctx.skill.repoUrl),
        target: "_blank",
        icon: (__VLS_ctx.Link),
        ...{ class: "repo-link" },
    }));
    const __VLS_100 = __VLS_99({
        type: "primary",
        href: (__VLS_ctx.skill.repoUrl),
        target: "_blank",
        icon: (__VLS_ctx.Link),
        ...{ class: "repo-link" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_99));
    /** @type {__VLS_StyleScopedClasses['repo-link']} */ ;
    const { default: __VLS_103 } = __VLS_101.slots;
    (__VLS_ctx.skill.repoUrl);
    // @ts-ignore
    [skill, skill, Link,];
    var __VLS_101;
    // @ts-ignore
    [];
    var __VLS_16;
}
// @ts-ignore
[];
const __VLS_export = (await import('vue')).defineComponent({});
export default {};
