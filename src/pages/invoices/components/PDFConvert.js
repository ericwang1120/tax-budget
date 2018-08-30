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
    flexDirection: "column",
    fontFamily: "Microsoft-Yahei"
  },
  section: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottom: 1
  }
});

const formatDate = date => date.format("YYYY/MM/DD");
// Create Document Component
const MyDocument = props => (
  <Document style={styles.document}>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text>{props.baseInfo.companyName}</Text>
        <Text>Tax Invoice</Text>
        <Text>{props.baseInfo.address}</Text>
        <Text>{formatDate(props.baseInfo.date)}</Text>
        <Text>{formatDate(props.baseInfo.dueDate)}</Text>
      </View>
      {props.list.map(p => (
        <View key={p.id}>
          <Text>{p.description}</Text>
        </View>
      ))}
    </Page>
  </Document>
);

export default MyDocument;
