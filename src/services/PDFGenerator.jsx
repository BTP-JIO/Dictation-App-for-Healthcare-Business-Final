import React from 'react';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';
import { pdf } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    padding: 30,
    backgroundColor: '#ffffff'
  },
  section: {
    margin: 10,
    padding: 10,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center'
  },
  fieldLabel: {
    fontSize: 12,
    marginBottom: 5,
    color: '#3f51b5',
    fontWeight: 'bold'
  },
  fieldValue: {
    fontSize: 11,
    marginBottom: 10,
    paddingLeft: 10
  },
  subsection: {
    marginLeft: 20,
    marginTop: 10,
    marginBottom: 10
  }
});

const PDFDocument = ({ data, title }) => {
  const renderField = (key, value, depth = 0) => {
    if (value === null || value === undefined || value === '') return null;

    const labelText = key
      .replace(/_/g, ' ')
      .replace(/\b\w/g, (l) => l.toUpperCase());

    if (typeof value === 'object' && !Array.isArray(value)) {
      return (
        <View key={key} style={depth > 0 ? styles.subsection : styles.section}>
          <Text style={styles.fieldLabel}>{labelText}</Text>
          {Object.entries(value).map(([subKey, subValue]) =>
            renderField(subKey, subValue, depth + 1)
          )}
        </View>
      );
    }

    return (
      <View key={key} style={depth > 0 ? styles.subsection : styles.section}>
        <Text style={styles.fieldLabel}>{labelText}:</Text>
        <Text style={styles.fieldValue}>{value}</Text>
      </View>
    );
  };

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text style={styles.title}>{title}</Text>
        {Object.entries(data).map(([key, value]) => renderField(key, value))}
      </Page>
    </Document>
  );
};

export const generatePDF = async (data, title) => {
  const blob = await pdf(<PDFDocument data={data} title={title} />).toBlob();
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `${title.toLowerCase().replace(/\s+/g, '_')}_${new Date().toISOString().split('T')[0]}.pdf`;
  link.click();
  URL.revokeObjectURL(url);
}; 