import { StyleSheet } from 'react-native';
import { colors } from '../../constants/colors';
import { fonts } from '../../constants/fonts';
import { textVariants } from '../../constants/typography';
import { scale } from 'react-native-size-matters';

export const styles = StyleSheet.create({
  contentWrapper: {
    flex: 1,
    position: 'relative',
  },
  container: {
    flex: 1,
    marginHorizontal: scale(20),
  },
  headerContainer: {
    position: 'relative',
  },
  threeDotContainer: {
    width: scale(28),
    height: scale(28),
    alignItems: 'center',
    justifyContent: 'center',
  },
  threeDot: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: scale(3),
  },
  dot: {
    width: scale(4),
    height: scale(4),
    borderRadius: scale(2),
    backgroundColor: colors.BLACK,
  },
  menuItem: {
    paddingHorizontal: scale(16),
    paddingVertical: scale(10),
  },
  menuItemText: {
    ...textVariants.font_14,
    fontFamily: fonts.Regular,
    color: colors.BLACK,
  },
  menuDivider: {
    height: 1,
    backgroundColor: colors.black20,
    marginVertical: scale(4),
  },
  menuOverlay: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  menuWrapper: {
    paddingTop: scale(44),
    alignItems: 'flex-end',
    paddingRight: scale(10),
  },
  menuContainer: {
    backgroundColor: colors.WHITE,
    borderRadius: scale(8),
    paddingTop: scale(4),
    paddingBottom: scale(4),
    minWidth: scale(120),
    shadowColor: colors.BLACK,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  fabButton: {
    position: 'absolute',
    bottom: scale(24),
    right: scale(20),
    width: scale(56),
    height: scale(56),
    borderRadius: scale(28),
    backgroundColor: colors.BLACK,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: colors.BLACK,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  fabButtonText: {
    fontSize: scale(28),
    color: colors.WHITE,
    fontWeight: '300',
    lineHeight: scale(32),
  },
  listContainer: {
    paddingBottom: scale(90),
  },
  emptyListContainer: {
    flex: 1,
  },
  noteCard: {
    backgroundColor: colors.WHITE,
    borderRadius: scale(12),
    padding: scale(16),
    marginBottom: scale(12),
    borderWidth: 1,
    borderColor: colors.black20,
    shadowColor: colors.BLACK,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 3,
  },
  noteHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: scale(10),
  },
  noteTitleContainer: {
    flex: 1,
    marginRight: scale(12),
  },
  noteTitle: {
    ...textVariants.font_16,
    fontFamily: fonts.Semibold,
    color: colors.BLACK,
    lineHeight: scale(22),
  },
  noteActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: scale(8),
    marginTop: scale(-2),
  },
  editButton: {
    width: scale(28),
    height: scale(28),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: scale(14),
  },
  editIcon: {
    width: scale(18),
    height: scale(18),
    tintColor: colors.BLACK,
  },
  deleteButton: {
    width: scale(28),
    height: scale(28),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: scale(14),
  },
  deleteIcon: {
    width: scale(18),
    height: scale(18),
    tintColor: colors.errorColor,
  },
  noteContent: {
    ...textVariants.font_14,
    fontFamily: fonts.Regular,
    color: colors.black50,
    marginBottom: scale(10),
    lineHeight: scale(20),
  },
  noteContentEmpty: {
    ...textVariants.font_14,
    fontFamily: fonts.Regular,
    color: colors.black50,
    fontStyle: 'italic',
    marginBottom: scale(10),
  },
  noteFooter: {
    marginTop: scale(8),
    paddingTop: scale(8),
    borderTopWidth: 1,
    borderTopColor: colors.black20,
  },
  noteDate: {
    ...textVariants.font_12,
    fontFamily: fonts.Regular,
    color: colors.black50,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: scale(100),
  },
  emptyText: {
    ...textVariants.font_18,
    fontFamily: fonts.Semibold,
    color: colors.BLACK,
    marginBottom: scale(8),
  },
  emptySubText: {
    ...textVariants.font_14,
    fontFamily: fonts.Regular,
    color: colors.black50,
    textAlign: 'center',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: scale(65),
  },
});
