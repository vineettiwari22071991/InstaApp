import { COLORS } from "@/constants/theme";
import { Dimensions, StyleSheet } from "react-native";

const { width, height } = Dimensions.get('window')

export const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: COLORS.background
    },
    contentContainer: {
        flex: 1,
    },
    header: {
        width: width,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingStart: 15,
        paddingEnd: 15,
        marginTop: 10
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: '400',
        color: COLORS.white,
        letterSpacing: 0.5,
    },
    emptyImageContainer: {
        flex: 1,
        width: width,
        justifyContent: 'center',
        alignItems: 'center'
    },
    emptyImageText: {
        fontSize: 16,
        fontWeight: '300',
        color: COLORS.grey,
        letterSpacing: 0.5,
        marginTop: 10
    },
    contentDisabled: {
        opacity: 0.7,
      },
      shareButton: {
        paddingHorizontal: 12,
        paddingVertical: 6,
        minWidth: 60,
        alignItems: "center",
        justifyContent: "center",
      },
      shareButtonDisabled: {
        opacity: 0.5,
      },
      shareText: {
        color: COLORS.primary,
        fontSize: 16,
        fontWeight: "600",
      },
      shareTextDisabled:{
        color: COLORS.grey,
      },
      scrollContainer:{
        flexGrow: 1
      },
      content:{
        flex: 1,
      },
      previewImage:{
        width: "100%",
        height: "100%"
      },
      imageSection: {
        width: width,
        height: width,
        backgroundColor: COLORS.surface,
        justifyContent: "center",
        alignItems: "center",
      },
      changeImageButton:{
        position: "absolute",
        bottom: 16,
        right: 16,
        backgroundColor: "rgba(0, 0, 0, 0.75)",
        flexDirection: "row",
        alignItems: "center",
        padding: 8,
        borderRadius: 8,
        gap: 6,
      },
      changeText:{
        fontSize: 16,
        fontWeight: '300',
        color: COLORS.white,
      },
      inputSection:{
        flex: 1,
        padding: 16,
      },
      captionContainer:{
        flexDirection: "row",
        justifyContent:'flex-start',
        alignItems: "flex-start",
      },
      userAvatar:{
        width: 40,
        height: 40,
        borderRadius: 20,
        marginRight: 12
      },
      captionInput:{
        flex: 1,
        color: COLORS.white,
        fontSize: 16,
        paddingTop: 8,
        minHeight: 40
      }
})