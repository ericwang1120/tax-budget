import React from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Font
} from "@react-pdf/renderer";
import MicrosoftYahei from "./Microsoft-Yahei.ttf";

Font.register(
  window.location.protocol + "//" + window.location.host + MicrosoftYahei,
  {
    family: "Microsoft-Yahei"
  }
);

// Create styles
const styles = StyleSheet.create({
  document: {
    width: "100%",
    height: 1100
  },
  page: {
    display: "flex",
    flexDirection: "column",
    paddingTop: 50,
    paddingRight: 50,
    paddingBottom: 100,
    paddingLeft: 50,
    fontFamily: "Microsoft-Yahei",
    justifyContent: "space-between"
  },
  section: {
    flexDirection: "row",
    justifyContent: "space-between",
    fontSize: 15,
    marginTop: 5,
    marginBottom: 15
  },
  gst: {
    fontSize: 10,
    alignSelf: "flex-end",
    marginBottom: 40
  },
  topLine: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottom: 1,
    text: {
      fontSize: 20
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
      justifyContent: "space-between",
      fontSize: 12
    },
    header: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      backgroundColor: "#8ac7e2",
      fontSize: 13
    }
  },
  total: {
    alignSelf: "flex-end",
    fontSize: 14,
    display: "flex",
    flexDirection: "row",
    header: {
      marginRight: 120
    }
  },
  balance: {
    alignSelf: "flex-end",
    display: "flex",
    flexDirection: "row",
    backgroundColor: "#3c3d3f",
    fontSize: 14,
    color: "white"
  }
});

const formatDate = date => date.format("YYYY/MM/DD");
const formatAmount = amount => (Math.round(amount * 100) / 100).toFixed(2);
// Create Document Component
function MyDocument(props) {
  const total = props.list
    .map(p => p.quantity * p.rate)
    .reduce((a, b) => a + b, 0);
  return (
    <Document style={styles.document}>
      <Page size="A4" orientation="landscape" style={styles.page}>
        <View>
          <View style={styles.gst}>
            <Text>GST Reg N°: {props.baseInfo.gstNo}</Text>
          </View>
          <View style={styles.topLine}>
            <Text style={styles.topLine.text}>
              {props.baseInfo.companyName}
            </Text>
            <Text style={styles.topLine.text}>Tax Invoice</Text>
          </View>
          <View style={styles.section}>
            <View style={{ flexGrow: 1 }}>
              <Text>Bill To: </Text>
            </View>
            <View style={{ flexGrow: 3 }}>
              <Text>{props.baseInfo.username}</Text>
              <Text>{props.baseInfo.address}</Text>
            </View>
            <View>
              <Text style={{ alignSelf: "flex-end" }}>
                Invoice No:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              </Text>
              <Text style={{ alignSelf: "flex-end" }}>
                Date:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              </Text>
              <Text style={{ alignSelf: "flex-end" }}>
                Due Date:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              </Text>
            </View>
            <View>
              <Text>{props.baseInfo.invoiceNo}</Text>
              <Text>{formatDate(props.baseInfo.date)}</Text>
              <Text>{formatDate(props.baseInfo.dueDate)}</Text>
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
                <Text style={styles.table.boxNormal}>
                  ${formatAmount(p.rate)}
                </Text>
                <Text style={styles.table.boxNormal}>
                  ${formatAmount(p.quantity * p.rate)}
                </Text>
              </View>
            ))}
          </View>
        </View>
        <View>
          <View style={styles.total}>
            <View style={styles.total.header}>
              <Text style={{ alignSelf: "flex-end" }}>Subtotal</Text>
              <Text style={{ alignSelf: "flex-end" }}>GST</Text>
              <Text style={{ alignSelf: "flex-end" }}>Total</Text>
              <Text style={{ alignSelf: "flex-end" }}>Paid</Text>
            </View>
            <View style={styles.total.amount}>
              <Text style={{ alignSelf: "flex-end" }}>
                ${formatAmount(total)}{" "}
              </Text>
              <Text style={{ alignSelf: "flex-end" }}>${formatAmount(0)}</Text>
              <Text style={{ alignSelf: "flex-end" }}>
                ${formatAmount(total)}
              </Text>
              <Text style={{ alignSelf: "flex-end" }}>
                ${formatAmount(props.baseInfo.isPaid ? total : 0)}
              </Text>
            </View>
          </View>
          <View style={styles.balance}>
            <Text style={{ alignSelf: "flex-end", marginRight: 120 }}>
              Balance Due
            </Text>
            <Text style={{ alignSelf: "flex-end" }}>
              ${formatAmount(props.baseInfo.isPaid ? 0 : total)}
            </Text>
          </View>
        </View>
      </Page>
    </Document>
  );
}

export default MyDocument;
