import { computed } from 'vue';
import { useSkillsStore } from '@/stores/skills';
import { useFavoritesStore } from '@/stores/favorites';
import SkillCard from '@/components/SkillCard.vue';
import { Delete } from '@element-plus/icons-vue';
import { ElMessageBox, ElMessage } from 'element-plus';
const store = useSkillsStore();
const favoritesStore = useFavoritesStore();
const favoriteSkills = computed(() => {
    return store.skills.filter(skill => favoritesStore.isFavorited(skill.id));
});
async function clearAll() {
    try {
        await ElMessageBox.confirm('确定要清空所有收藏吗？此操作不可恢复。', '确认清空', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
        });
        favoritesStore.clearFavorites();
        ElMessage.success('收藏已清空');
    }
    catch {
        // 用户取消
    }
}
const __VLS_ctx = {
    ...{},
    ...{},
};
let __VLS_components;
let __VLS_intrinsics;
let __VLS_directives;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "favorites-view" },
});
/** @type {__VLS_StyleScopedClasses['favorites-view']} */ ;
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
(__VLS_ctx.favoriteSkills.length);
// @ts-ignore
[favoriteSkills,];
var __VLS_15;
// @ts-ignore
[];
var __VLS_9;
let __VLS_18;
/** @ts-ignore @type { | typeof __VLS_components.elCol | typeof __VLS_components.ElCol | typeof __VLS_components['el-col'] | typeof __VLS_components.elCol | typeof __VLS_components.ElCol | typeof __VLS_components['el-col']} */
elCol;
// @ts-ignore
const __VLS_19 = __VLS_asFunctionalComponent1(__VLS_18, new __VLS_18({
    span: (12),
    ...{ class: "actions" },
}));
const __VLS_20 = __VLS_19({
    span: (12),
    ...{ class: "actions" },
}, ...__VLS_functionalComponentArgsRest(__VLS_19));
/** @type {__VLS_StyleScopedClasses['actions']} */ ;
const { default: __VLS_23 } = __VLS_21.slots;
if (__VLS_ctx.favoriteSkills.length > 0) {
    let __VLS_24;
    /** @ts-ignore @type { | typeof __VLS_components.elButton | typeof __VLS_components.ElButton | typeof __VLS_components['el-button'] | typeof __VLS_components.elButton | typeof __VLS_components.ElButton | typeof __VLS_components['el-button']} */
    elButton;
    // @ts-ignore
    const __VLS_25 = __VLS_asFunctionalComponent1(__VLS_24, new __VLS_24({
        ...{ 'onClick': {} },
        type: "danger",
        icon: (__VLS_ctx.Delete),
        link: true,
    }));
    const __VLS_26 = __VLS_25({
        ...{ 'onClick': {} },
        type: "danger",
        icon: (__VLS_ctx.Delete),
        link: true,
    }, ...__VLS_functionalComponentArgsRest(__VLS_25));
    let __VLS_29;
    const __VLS_30 = ({ click: {} },
        { onClick: (__VLS_ctx.clearAll) });
    const { default: __VLS_31 } = __VLS_27.slots;
    // @ts-ignore
    [favoriteSkills, Delete, clearAll,];
    var __VLS_27;
    var __VLS_28;
}
// @ts-ignore
[];
var __VLS_21;
// @ts-ignore
[];
var __VLS_3;
if (__VLS_ctx.favoriteSkills.length === 0) {
    let __VLS_32;
    /** @ts-ignore @type { | typeof __VLS_components.elEmpty | typeof __VLS_components.ElEmpty | typeof __VLS_components['el-empty'] | typeof __VLS_components.elEmpty | typeof __VLS_components.ElEmpty | typeof __VLS_components['el-empty']} */
    elEmpty;
    // @ts-ignore
    const __VLS_33 = __VLS_asFunctionalComponent1(__VLS_32, new __VLS_32({
        description: "还没有收藏任何 Skill，快去首页发现吧！",
    }));
    const __VLS_34 = __VLS_33({
        description: "还没有收藏任何 Skill，快去首页发现吧！",
    }, ...__VLS_functionalComponentArgsRest(__VLS_33));
    const { default: __VLS_37 } = __VLS_35.slots;
    let __VLS_38;
    /** @ts-ignore @type { | typeof __VLS_components.elButton | typeof __VLS_components.ElButton | typeof __VLS_components['el-button'] | typeof __VLS_components.elButton | typeof __VLS_components.ElButton | typeof __VLS_components['el-button']} */
    elButton;
    // @ts-ignore
    const __VLS_39 = __VLS_asFunctionalComponent1(__VLS_38, new __VLS_38({
        ...{ 'onClick': {} },
        type: "primary",
    }));
    const __VLS_40 = __VLS_39({
        ...{ 'onClick': {} },
        type: "primary",
    }, ...__VLS_functionalComponentArgsRest(__VLS_39));
    let __VLS_43;
    const __VLS_44 = ({ click: {} },
        { onClick: (...[$event]) => {
                if (!(__VLS_ctx.favoriteSkills.length === 0))
                    return;
                __VLS_ctx.$router.push('/');
                // @ts-ignore
                [favoriteSkills, $router,];
            } });
    const { default: __VLS_45 } = __VLS_41.slots;
    // @ts-ignore
    [];
    var __VLS_41;
    var __VLS_42;
    // @ts-ignore
    [];
    var __VLS_35;
}
else {
    let __VLS_46;
    /** @ts-ignore @type { | typeof __VLS_components.elRow | typeof __VLS_components.ElRow | typeof __VLS_components['el-row'] | typeof __VLS_components.elRow | typeof __VLS_components.ElRow | typeof __VLS_components['el-row']} */
    elRow;
    // @ts-ignore
    const __VLS_47 = __VLS_asFunctionalComponent1(__VLS_46, new __VLS_46({
        gutter: (16),
    }));
    const __VLS_48 = __VLS_47({
        gutter: (16),
    }, ...__VLS_functionalComponentArgsRest(__VLS_47));
    const { default: __VLS_51 } = __VLS_49.slots;
    for (const [skill] of __VLS_vFor((__VLS_ctx.favoriteSkills))) {
        let __VLS_52;
        /** @ts-ignore @type { | typeof __VLS_components.elCol | typeof __VLS_components.ElCol | typeof __VLS_components['el-col'] | typeof __VLS_components.elCol | typeof __VLS_components.ElCol | typeof __VLS_components['el-col']} */
        elCol;
        // @ts-ignore
        const __VLS_53 = __VLS_asFunctionalComponent1(__VLS_52, new __VLS_52({
            key: (skill.id),
            xs: (24),
            sm: (12),
            md: (8),
            lg: (6),
            ...{ class: "skill-col" },
        }));
        const __VLS_54 = __VLS_53({
            key: (skill.id),
            xs: (24),
            sm: (12),
            md: (8),
            lg: (6),
            ...{ class: "skill-col" },
        }, ...__VLS_functionalComponentArgsRest(__VLS_53));
        /** @type {__VLS_StyleScopedClasses['skill-col']} */ ;
        const { default: __VLS_57 } = __VLS_55.slots;
        const __VLS_58 = SkillCard;
        // @ts-ignore
        const __VLS_59 = __VLS_asFunctionalComponent1(__VLS_58, new __VLS_58({
            skill: (skill),
        }));
        const __VLS_60 = __VLS_59({
            skill: (skill),
        }, ...__VLS_functionalComponentArgsRest(__VLS_59));
        // @ts-ignore
        [favoriteSkills,];
        var __VLS_55;
        // @ts-ignore
        [];
    }
    // @ts-ignore
    [];
    var __VLS_49;
}
// @ts-ignore
[];
const __VLS_export = (await import('vue')).defineComponent({});
export default {};
