import { queryKeys } from "@renderer/queryKeys/keys";
import { PackType } from "../../../main/types";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { downloadPackAccordingly, getPacks, processData } from "@renderer/services/packsController";
import PackCard from "./Card/Card";
import { useEffect, useState } from "react";
import { Modal } from "@mantine/core";
import { Grid } from "react-loader-spinner";

export default function DownloadPacks(): JSX.Element {
    const queryClient = useQueryClient();
    const [isSomethingDownloading, setIsSomethingDownloading] = useState(false);
    const [isOffline, setIsOffline] = useState(false);

    const { data, isLoading } = useQuery({ queryKey: queryKeys.packs.fetchAll, queryFn: getPacks }, queryClient);

    const handleDownload = async (id: number, packType: string) => {
        setIsSomethingDownloading(true);
        let data = await downloadPackAccordingly(id, packType as PackType);
        await processData(packType as PackType, data);

        await queryClient.invalidateQueries({
            queryKey: queryKeys.packs.fetchAll,
        });

        setIsSomethingDownloading(false);
    }

    useEffect(() => {
        const updateOnlineStatus = () => {
            console.log('is offline', !navigator.onLine);

            setIsOffline(!navigator.onLine);
        };

        window.addEventListener('online', updateOnlineStatus);
        window.addEventListener('offline', updateOnlineStatus);

        return () => {
            window.removeEventListener('online', updateOnlineStatus);
            window.removeEventListener('offline', updateOnlineStatus);
        };
    }, []);



    return (
        <div>
            {
                isLoading ? <p>Loading please wait...</p>
                    : (
                        <div className="w-full h-screen flex flex-col p-10 gap-10 overflow-y-scroll">
                            <div>
                                <h1 className="text-lg font-bold">Download Packs</h1>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
                                {
                                    data?.map((pack) => (
                                        <PackCard key={pack.id} handleDownload={() => handleDownload(pack.id, pack.packType)} pack={pack} isOffline={isOffline} />
                                    ))
                                }
                            </div>
                        </div>
                    )
            }

            <Modal opened={isSomethingDownloading} onClose={() => { }} title="" centered withCloseButton={false}>
                <div className="flex w-full justify-center items-center p-10 flex-col">
                    <Grid
                        visible={true}
                        height="40"
                        width="40"
                        color="#1560BD"
                        ariaLabel="grid-loading"
                        radius="12.5"
                        wrapperStyle={{}}
                        wrapperClass="grid-wrapper"
                    />

                    <p className="mt-5 text-center">Please wait and do not close the app. Your pack is being downloaded and processed.</p>
                </div>
            </Modal>
        </div>
    )
}