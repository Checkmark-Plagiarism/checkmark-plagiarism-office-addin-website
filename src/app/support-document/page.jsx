import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { Container, Typography, Box, List, ListItem, ListItemText } from "@mui/material";

export default function Support() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <Container maxWidth="md" sx={{ py: 6 }}>
          {/* Page Title */}
          <Typography variant="h4" component="h1" gutterBottom>
            Checkmark Plagiarism Add-in Support
          </Typography>
          <Typography variant="body1" paragraph>
            This guide introduces the key features of the Checkmark Plagiarism Microsoft Word add-in
            and explains how to use it effectively in your workflow.
          </Typography>

          {/* Features Section */}
          <Box mt={4}>
            <Typography variant="h5" component="h2" gutterBottom>
              Features
            </Typography>
            <List>
              <ListItem>
                <ListItemText
                  primary="WPM Tracker"
                  secondary="Track your words-per-minute writing speed in real time while working on your document."
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="Sentence Count"
                  secondary="Automatically calculates the number of sentences in your document to help monitor structure and flow."
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="Word Count"
                  secondary="Displays the total number of words written, updating instantly as you type."
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="Paragraph Count"
                  secondary="Keeps track of how many paragraphs are included, helping you balance your writing."
                />
              </ListItem>
            </List>
          </Box>

          {/* Safe to Close Section */}
          <Box mt={4}>
            <Typography variant="h5" component="h2" gutterBottom>
              Working While the Add-in is Closed
            </Typography>
            <Typography variant="body1" paragraph>
              You can safely close the Checkmark Plagiarism add-in panel while continuing to work on
              your document. All writing data, including counts and plagiarism analysis, is saved
              securely to your document — not to external servers — ensuring your progress is never lost.
            </Typography>
          </Box>

          {/* Help Section */}
          <Box mt={4}>
            <Typography variant="h5" component="h2" gutterBottom>
              Need Help?
            </Typography>
            <Typography variant="body1">
              If you encounter issues or have questions, please contact our support team through the
              official Checkmark Plagiarism help portal.
            </Typography>
          </Box>
        </Container>
      </main>
      <Footer />
    </div>
  );
}
