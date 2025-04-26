import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    paddingTop: 40,
  },
  item: {
    margin: 10,
    padding: 10,
    color: "slategrey",
    backgroundColor: "ghostwhite",
    textAlign: "center",
  },

  textInputContainer: {
    marginVertical: 10,
  },
  textInputLabel: {
    fontSize: 14,
    marginBottom: 4,
    fontWeight: "bold",
  },
  textInput: {
    borderWidth: 1,
    borderColor: "gray",
    padding: 8,
    borderRadius: 5,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.3)",
  },
  modalInner: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  swipeContainer: {
    height: 80,
    marginVertical: 6,
    backgroundColor: "white",
    overflow: "hidden",
  },

  swipeItem: {
    width: 400,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#eef",
    height: "100%",
    borderRadius: 8,
  },

  swipeBlank: {
    width: 400,
  },

  swipeItemText: {
    fontSize: 18,
    color: "#444",
  },
  
  
});
