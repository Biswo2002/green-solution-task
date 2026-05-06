import { getMargin, getHeight, getWidth } from "$/components/helper";
import { Platform, StyleSheet } from "react-native";
import { ZORRRO_COLORS, ZORRRO_FONTS } from "$/styles";

export const SosDetailsStyles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: ZORRRO_COLORS?.WHITE,
    },
    headerGradient: {
        paddingTop: Platform.OS === 'android' ? '12%' : 0,
        paddingHorizontal: getMargin(16),
        height: getHeight(252),
    },
    headerNav: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    backButton: {
        marginRight: 12,
    },
    headerNavTitle: {
        color: ZORRRO_COLORS?.WHITE,
        fontSize: 16,
        fontFamily: ZORRRO_FONTS?.[700]?.normal,
    },
    headerContent: {
        marginTop: getMargin(16),
    },
    mainHeading: {
        color: ZORRRO_COLORS?.WHITE,
        fontSize: 36,
        fontFamily: ZORRRO_FONTS?.[700]?.normal,
        marginBottom: getMargin(8),
    },
    subHeading: {
        color: ZORRRO_COLORS?.WHITE,
        fontSize: 14,
        opacity: 0.9,
    },
    body: {
        flex: 1,
        paddingHorizontal: getMargin(16),
        marginTop: getMargin(24),
    },
    sectionTitle: {
        fontSize: 20,
        fontFamily: ZORRRO_FONTS?.[600]?.normal,
        color: '#262626',
        marginBottom: getMargin(16),
    },
    stepperContainer: {
        marginBottom: 10,
    },
    stepRow: {
        flexDirection: 'row',
    },
    stepIndicator: {
        alignItems: 'center',
        width: getWidth(30),
    },
    dotFilled: {
        width: 20,
        height: 20,
        borderRadius: 80,
        backgroundColor: '#10B981',
        zIndex: 1,
    },
    lineFilled: {
        width: 2,
        height: 67,
        backgroundColor: ZORRRO_COLORS?.WHITE,
        borderWidth: 1,
        borderColor: '#10B981',
        borderStyle: 'dashed',
    },
    lineDashed: {
        width: 2,
        height: 67,
        borderWidth: 1,
        borderColor: '#D1D5DB',
        borderStyle: 'dashed',
        marginVertical: 4,
    },
    stepContent: {
        flex: 1,
        paddingLeft: 10,
        paddingBottom: 30,
        justifyContent: 'flex-start',
        marginTop: -2,
    },
    stepTitle: {
        fontSize: 16,
        color: '#111827',
        fontWeight: '500',
    },
    stepTitlePending: {
        color: '#6B7280',
    },
    stepTime: {
        fontSize: 12,
        color: '#6B7280',
        marginTop: 4,
    },
    divider: {
        height: 1,
        backgroundColor: '#E5E7EB',
        marginHorizontal: -20,
        marginBottom: getMargin(24),
    },
    addInfoButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: getMargin(16),
        height: getHeight(44),
        borderRadius: 12,
        borderWidth: 2,
        borderColor: '#ABB2BA',
        marginBottom: getMargin(10),

        backgroundColor: ZORRRO_COLORS?.WHITE,
        ...(Platform?.OS === 'android'
            ? {
                elevation: 2,
                shadowColor: '#0000001F',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.12,
                shadowRadius: 6,
            }
            : {
                shadowColor: '#0000001F',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.12,
                shadowRadius: 6,
            }),
    },
    addInfoText: {
        fontSize: 15,
        color: '#111827',
        fontFamily: ZORRRO_FONTS?.[500]?.normal,
    },
    submittedInfoContainer: {
        marginTop: getMargin(10),
        paddingBottom: getMargin(100),
    },
    infoCard: {
        backgroundColor: ZORRRO_COLORS?.WHITE,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: '#E0E3E8',
        padding: getMargin(16),
    },
    infoRowText: {
        fontSize: 14,
        color: '#687282',
        marginBottom: getMargin(16),
        fontFamily: ZORRRO_FONTS?.[500]?.normal,
    },
    evidenceItemCard: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F6F7F8',
        borderWidth: 1,
        borderColor: '#EDF0F6',
        paddingHorizontal: getMargin(8),
        borderRadius: 8,
        marginBottom: getMargin(12),
        height: getHeight(36),
    },
    evidenceItemName: {
        fontSize: 14,
        color: '#4A5565',
        marginLeft: 12,
        fontFamily: ZORRRO_FONTS?.[400]?.normal,
    },
    bottomSheet: {
        paddingHorizontal: getMargin(16),
        paddingBottom: getMargin(30),
    },
    sheetHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: getMargin(24),
    },
    sheetTitle: {
        fontSize: 16,
        fontFamily: ZORRRO_FONTS?.[600]?.normal,
        color: '#262626',
    },
    closeBtn: {
        backgroundColor: '#F3F4F6',
        width: 24,
        height: 24,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
    },
    closeBtnText: {
        fontSize: 12,
        color: '#4B5563',
    },
    sheetSection: {
        marginBottom: 20,
    },
    sheetSectionTitle: {
        fontSize: 14,
        color: '#6B7280',
        marginBottom: 12,
        fontFamily: ZORRRO_FONTS?.[500]?.normal,
    },
    gridContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    gridItem: {
        width: '31%',
        aspectRatio: 1.2,
        backgroundColor: ZORRRO_COLORS?.WHITE,
        borderWidth: 1,
        borderColor: '#E5E7EB',
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: getMargin(12),
    },
    gridItemSelected: {
        borderColor: '#0084C8',
    },
    gridItemText: {
        fontSize: 12,
        color: '#6B7280',
        marginTop: 8,
    },
    gridItemTextSelected: {
        color: '#0084C8',
    },
    pillContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    pill: {
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#E5E7EB',
        marginRight: 10,
        marginBottom: 10,
    },
    pillSelected: {
        borderColor: '#0084C8',
    },
    pillText: {
        fontSize: 14,
        color: '#6B7280',
    },
    pillTextSelected: {
        color: '#0084C8',
    },
    evidenceBtnRow: {
        flexDirection: 'row',
    },
    evidenceBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#E5E7EB',
        marginRight: 10,
    },
    evidenceBtnText: {
        fontSize: 14,
        color: '#6B7280',
        marginLeft: 6,
    },
    evidenceListItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#F9FAFB',
        padding: 12,
        borderRadius: 8,
        marginBottom: 8,
    },
    evidenceListLeft: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    evidenceListName: {
        fontSize: 14,
        color: '#4B5563',
        marginLeft: 12,
    },
    evidenceListClose: {
        fontSize: 16,
        color: '#4B5563',
    },
    sendButton: {
        backgroundColor: '#0084C8',
        borderRadius: 8,
        paddingVertical: 14,
        alignItems: 'center',
        marginTop: 10,
    },
    sendButtonText: {
        color: ZORRRO_COLORS?.WHITE,
        fontSize: 16,
        fontWeight: 'bold',
    },
});
