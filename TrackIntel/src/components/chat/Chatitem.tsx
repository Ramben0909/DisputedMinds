import { Box, Avatar, Typography, Button } from "@mui/material";
import { useAuth } from "../../context/useAuth";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Download } from "lucide-react";

// function extractCodeFromString(message: string) {
//   if (message.includes("```")) {
//     const blocks = message.split("```");
//     return blocks.filter((block) => block.trim().length > 0);
//   }
//   return [];
// }

// function isCodeBlock(str: string) {
//   return (
//     str.includes("=") ||
//     str.includes(";") ||
//     str.includes("[") ||
//     str.includes("]") ||
//     str.includes("{") ||
//     str.includes("}") ||
//     str.includes("#") ||
//     str.includes("//") ||
//     str.includes("SELECT") ||
//     str.includes("INSERT") ||
//     str.includes("UPDATE") ||
//     str.includes("DELETE") ||
//     str.includes("|")
//   );
// }

// Function to parse JSON response
const parseJsonResponse = (content: string) => {
  try {
    const jsonData = JSON.parse(content);
    if (jsonData.response && typeof jsonData.response === 'string') {
      return jsonData.response;
    }
    return content;
  } catch (e) {
    return content;
  }
};

// Function to convert table data to CSV
const convertToCSV = (markdownTable: string) => {
  const rows = markdownTable.split('\n')
    .filter(row => row.trim() !== '' && !row.includes('---'))
    .map(row => row.trim().split('|')
      .filter(cell => cell.trim() !== '')
      .map(cell => cell.trim()));
  
  return rows
    .map(row => row.map(cell => `"${cell.replace(/"/g, '""')}"`).join(','))
    .join('\n');
};

const downloadCSV = (markdownTable: string, filename = 'table-data.csv') => {
  const csv = convertToCSV(markdownTable);
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  
  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

const TableWrapper = ({ children, block }: { children: React.ReactNode, block: string }) => (
  <Box sx={{ position: 'relative', width: '100%', mb: 2 }}>
    <Box sx={{ 
      position: 'absolute', 
      top: -40, 
      right: 0, 
      zIndex: 1,
      display: 'flex',
      gap: 1
    }}>
      <Button
        variant="contained"
        size="small"
        onClick={() => downloadCSV(block)}
        startIcon={<Download size={16} />}
        sx={{ 
          bgcolor: '#004d56',
          '&:hover': { bgcolor: '#006d76' }
        }}
      >
        Download CSV
      </Button>
    </Box>
    {children}
  </Box>
);

const ChatItem = ({
  content,
  role,
}: {
  content: string;
  role: "user" | "assistant";
}) => {
  const parsedContent = parseJsonResponse(content);
  // const messageBlocks = extractCodeFromString(parsedContent);
  const auth = useAuth();

  // New: Handle regular text and table content separately
  const hasTable = parsedContent.includes('|');
  const textContent = hasTable 
    ? parsedContent.split('|')[0].trim() 
    : parsedContent;
  const tableContent = hasTable 
    ? [parsedContent.substring(parsedContent.indexOf('|'))] 
    : [];

  return role === "assistant" ? (
    <Box
      sx={{
        display: "flex",
        p: 2,
        bgcolor: "#004d5612",
        gap: 2,
        borderRadius: 2,
        my: 1,
      }}
    >
      <Avatar sx={{ ml: "0" }}>
        <img src="/F1-logo-red-on-white.jpeg" alt="F1" width={"50px"} />
      </Avatar>
      <Box sx={{ width: '100%' }}>
        {/* Display text content first */}
        {textContent && (
          <Typography sx={{ color: "white", fontSize: "16px", mb: 2 }}>
            {textContent}
          </Typography>
        )}
        
        {/* Then display table if exists */}
        {tableContent.map((block, index) => (
          <TableWrapper key={index} block={block}>
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                table: ({ children }) => (
                  <table
                    style={{
                      width: "100%",
                      borderCollapse: "collapse",
                      backgroundColor: "#2d333b",
                      color: "white",
                      wordWrap: "break-word",
                      tableLayout: "fixed",
                      margin: "20px 0",
                      borderRadius: "8px",
                      overflow: "hidden",
                      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                    }}
                  >
                    {children}
                  </table>
                ),
                th: ({ children }) => (
                  <th
                    style={{
                      border: "1px solid #444",
                      padding: "16px 24px",
                      backgroundColor: "#404854",
                      color: "white",
                      whiteSpace: "normal",
                      fontWeight: "600",
                      fontSize: "1.1em",
                      textAlign: "left",
                    }}
                  >
                    {children}
                  </th>
                ),
                td: ({ children }) => (
                  <td
                    style={{
                      border: "1px solid #444",
                      padding: "14px 24px",
                      color: "#d1d5db",
                      wordWrap: "break-word",
                      textAlign: "left",
                      fontSize: "1em",
                    }}
                  >
                    {children}
                  </td>
                ),
              }}
            >
              {block}
            </ReactMarkdown>
          </TableWrapper>
        ))}
      </Box>
    </Box>
  ) : (
    // User message section with similar structure
    <Box
      sx={{
        display: "flex",
        p: 2,
        bgcolor: "#004d56",
        gap: 2,
        borderRadius: 2,
      }}
    >
      <Avatar sx={{ ml: "0", bgcolor: "black", color: "white" }}>
        {auth?.user?.name[0]}
        {auth?.user?.name.split(" ")[1][0]}
      </Avatar>
      <Box sx={{ width: '100%' }}>
        {/* Display text content first */}
        {textContent && (
          <Typography sx={{ color: "white", fontSize: "16px", mb: 2 }}>
            {textContent}
          </Typography>
        )}
        
        {/* Then display table if exists */}
        {tableContent.map((block, index) => (
          <TableWrapper key={index} block={block}>
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                table: ({ children }) => (
                  <table
                    style={{
                      width: "100%",
                      borderCollapse: "collapse",
                      backgroundColor: "#2d333b",
                      color: "white",
                      wordWrap: "break-word",
                      tableLayout: "fixed",
                      margin: "20px 0",
                      borderRadius: "8px",
                      overflow: "hidden",
                      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                    }}
                  >
                    {children}
                  </table>
                ),
                th: ({ children }) => (
                  <th
                    style={{
                      border: "1px solid #444",
                      padding: "16px 24px",
                      backgroundColor: "#404854",
                      color: "white",
                      whiteSpace: "normal",
                      fontWeight: "600",
                      fontSize: "1.1em",
                      textAlign: "left",
                    }}
                  >
                    {children}
                  </th>
                ),
                td: ({ children }) => (
                  <td
                    style={{
                      border: "1px solid #444",
                      padding: "14px 24px",
                      color: "#d1d5db",
                      wordWrap: "break-word",
                      textAlign: "left",
                      fontSize: "1em",
                    }}
                  >
                    {children}
                  </td>
                ),
              }}
            >
              {block}
            </ReactMarkdown>
          </TableWrapper>
        ))}
      </Box>
    </Box>
  );
};

export default ChatItem;