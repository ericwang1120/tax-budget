import React from "react";
import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";

// Create styles
const styles = StyleSheet.create({
  document: {
    width: "100%",
    height: 1480
  },
  page: {
    flexDirection: "row"
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1
  }
});

// Create Document Component
const MyDocument = props => (
  <Document style={styles.document}>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text>Section #1</Text>
      </View>
      <View style={styles.section}>
        <Text>{props.list[0].name}</Text>
      </View>
      {props.list.map(p => {
        return (
          <View style={styles.section}>
            <Text>{p.name}</Text>
          </View>
        );
      })}
    </Page>
  </Document>
);

export default MyDocument;
