import { QueryClient, QueryClientProvider, useQuery, useQueryClient } from "@tanstack/react-query"
import { downloadPackAccordingly, getPacks, processData } from "./services/packsController";
import { queryKeys } from "./queryKeys/keys";
import { PackType } from "../../main/types";
import { createTheme, MantineProvider } from '@mantine/core';

import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';
import '@mantine/dropzone/styles.css';
import '@mantine/code-highlight/styles.css';
import 'mantine-react-table/styles.css';

import { Sidebar } from "./components/Sidebar/Sidebar";
import { useState } from "react";
import DownloadPacks from "./components/PacksDownloader";
import ArmorTable from "./components/Table/Table";

const queryClient = new QueryClient();

const theme = createTheme({});

function renderTabContent(selectedTab: number): JSX.Element {
  switch (selectedTab) {
    case 0:
      return (
        <div>
          <h1>Dashboard</h1>
        </div>
      );
    case 1:
      return (
        <div>
          <DownloadPacks />
        </div>
      );
    case 2:
      return (
        <div className="flex w-screen max-w-screen">
          <ArmorTable />
        </div>
      );

    default:
      return <div>Select a tab</div>;
  }
}

function App(): JSX.Element {
  const [selectedTab, setSelectedTab] = useState(0);


  return (

    <QueryClientProvider client={queryClient}>
      <MantineProvider theme={theme}>
        <div className="flex max-h-screen flex-row overflow-hidden">
          <Sidebar active={selectedTab} setActive={setSelectedTab} />
          {/* <button onClick={() => window.electron.ipcRenderer.send("open-window", "combat-tracker")}>asdsa</button>
      <button onClick={() => window.electron.ipcRenderer.send("message", "hii")}>asdsasdasdasd</button> */}
          {renderTabContent(selectedTab)}

          <div className="mt-10 mb-10">

          </div>
        </div>
        {/* Your app here */}
      </MantineProvider>
    </QueryClientProvider>
  )
}

export default App
