import { QueryClient, QueryClientProvider, useQuery, useQueryClient } from "@tanstack/react-query"
import { downloadPackAccordingly, getPacks } from "./services/packsController";
import { queryKeys } from "./queryKeys/keys";
import { APISpell, Open5eRequest, PackType } from "../../main/types";
import { createManySpells, createSpell, parseSpellsFromAPI } from "./services/spellsController";

const queryClient = new QueryClient();

function App(): JSX.Element {
  return (

    <QueryClientProvider client={queryClient}>
      <div>
        <div className="bg-red-200 size-8"></div>
        {/* <button onClick={() => window.electron.ipcRenderer.send("open-window", "combat-tracker")}>asdsa</button>
      <button onClick={() => window.electron.ipcRenderer.send("message", "hii")}>asdsasdasdasd</button> */}


        <div className="mt-10 mb-10">
          <DownloadPacks />
        </div>
      </div>
    </QueryClientProvider>
  )
}

function DownloadPacks(): JSX.Element {
  const queryClient = useQueryClient()

  const { data, isLoading } = useQuery({ queryKey: queryKeys.packs.fetchAll, queryFn: getPacks }, queryClient);

  const handleDownload = async (id: number, packType: string) => {
    let data = await downloadPackAccordingly(id, packType as PackType);

    switch (packType) {
      case PackType.Spell:
        let preParse = data as unknown as APISpell[];
        let parsed = parseSpellsFromAPI(preParse);

        await createManySpells(parsed)

        break;
    }

    await queryClient.invalidateQueries({
      queryKey: queryKeys.packs.fetchAll,
    });
  }

  return (
    <div>
      {
        isLoading ? <p>Loading please wait...</p>
          : (
            <div className="flex flex-col gap-4">
              {
                data?.map((pack) => (
                  <div key={pack.id}>
                    {
                      pack.downloaded ? <p>✅ Already downloaded</p> : <button onClick={() => handleDownload(pack.id, pack.packType)}>Download {pack.name}</button>
                    }
                  </div>
                ))
              }
            </div>
          )
      }
    </div>
  )
}

export default App
