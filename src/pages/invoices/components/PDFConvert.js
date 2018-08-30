import React from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Font
} from "@react-pdf/renderer";

Font.register(
  `https://raw.githubusercontent.com/ericwang1120/tax-budget/master/src/pages/invoices/components/Microsoft-Yahei.ttf`,
  { family: "Microsoft-Yahei" }
);

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
    flexGrow: 1,
    fontFamily: "Microsoft-Yahei"
  }
});

// Create Document Component
const MyDocument = props => (
  <Document style={styles.document}>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text>{props.baseInfo.companyName}</Text>
      </View>
      {props.list.map(p => {
        return (
          <View style={styles.section} key={p.id}>
            <Text>{p.description}</Text>
          </View>
        );
      })}
    </Page>
  </Document>
);

export default MyDocument;
