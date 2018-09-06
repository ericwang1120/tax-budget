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
    height: 1100
  },
  page: {
    flexDirection: "column",
    fontFamily: "Microsoft-Yahei"
  },
  section: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottom: 1
  },
  topLine: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottom: 1,
    text: {
      fontSize: 12
    }
  },
  table: {
    display: "flex",
    boxLarge: {
      width: "40%"
    },
    boxNormal: {
      width: "20%"
    },
    row: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between"
    },
    header: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      backgroundColor: "blue"
    }
  }
});

const formatDate = date => date.format("YYYY/MM/DD");
// Create Document Component
function MyDocument(props) {
  const total = props.list
    .map(p => p.quantity * p.rate)
    .reduce((a, b) => a + b);
  return (
    <Document style={styles.document}>
      <Page size="A4" orientation="landscape" style={styles.page}>
        <View style={styles.topLine}>
          <Text style={styles.topLine.text}>{props.baseInfo.companyName}</Text>
          <Text style={styles.topLine.text}>Tax Invoice</Text>
        </View>
        <View style={styles.section}>
          <View>
            <Text>Bill To: </Text>
          </View>
          <View>
            <Text>{props.baseInfo.username}</Text>
            <Text>{props.baseInfo.address}</Text>
          </View>
          <View>
            <Text>Invoice No: {props.baseInfo.invoiceNo}</Text>
            <Text>Date: {formatDate(props.baseInfo.date)}</Text>
            <Text>Due Date: {formatDate(props.baseInfo.dueDate)}</Text>
          </View>
        </View>
        <View style={styles.table}>
          <View style={styles.table.header}>
            <Text style={styles.table.boxLarge}>Description</Text>
            <Text style={styles.table.boxNormal}>Quantity</Text>
            <Text style={styles.table.boxNormal}>Rate</Text>
            <Text style={styles.table.boxNormal}>Amount</Text>
          </View>
          {props.list.map(p => (
            <View style={styles.table.row} key={p.id}>
              <Text style={styles.table.boxLarge}>{p.description}</Text>
              <Text style={styles.table.boxNormal}>{p.quantity}</Text>
              <Text style={styles.table.boxNormal}>{p.rate}</Text>
              <Text style={styles.table.boxNormal}>{p.quantity * p.rate}</Text>
            </View>
          ))}
        </View>
        <View>
          <Text>Subtotal: {total} </Text>
          <Text>GST:0</Text>
          <Text>
            Total:
            {total}
          </Text>
          <Text>
            Paid:
            {props.baseInfo.isPaid ? total : 0}
          </Text>
          <Text>
            Balance Due:
            {props.baseInfo.isPaid ? 0 : total}
          </Text>
        </View>
      </Page>
    </Document>
  );
}

export default MyDocument;
