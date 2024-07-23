import '@mantine/core/styles.css';
import '@mantine/dates/styles.css'; //if using mantine date picker features
import 'mantine-react-table/styles.css'; //make sure MRT styles were imported in your app root (once)
import { useMemo } from 'react';
import {
    MantineReactTable,
    useMantineReactTable,
    type MRT_ColumnDef,
} from 'mantine-react-table';
import { Armor } from '../../../../main/types';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { queryKeys } from '@renderer/queryKeys/keys';
import { getArmors } from '@renderer/services/armorsController';
import { Grid } from 'react-loader-spinner';

const ArmorTable = () => {
    const queryClient = useQueryClient();

    const { data, isLoading } = useQuery({ queryKey: queryKeys.armors.fetchAll, queryFn: getArmors, initialData: [] }, queryClient);

    if (isLoading) {
        return <div className='w-full h-screen justify-center items-center'>
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
        </div>
    }

    //should be memoized or stable
    const columns = useMemo<MRT_ColumnDef<Armor>[]>(
        () => [
            {
                accessorKey: 'name',
                header: 'Name',
            },
            {
                accessorKey: 'category',
                header: 'Category',
            },
            {
                accessorKey: 'base_ac',
                header: 'Base AC',
            },
            {
                accessorKey: 'plus_dex_mod',
                header: 'Plus Dex Mod',
            },
            {
                accessorKey: "plus_wis_mod",
                header: "Plus Wis Mod",
            },
            {
                accessorKey: "plus_con_mod",
                header: "Plus Con Mod",
            },
            {
                accessorKey: "plus_flat_mod",
                header: "Plus Flat Mod",
            },
            {
                accessorKey: "plus_max",
                header: "Plus Max",
            },
            {
                accessorKey: "strength_requirement",
                header: "Strength Requirement",
            },
            {
                accessorKey: "cost",
                header: "Cost",
            },
            {
                accessorKey: "stealth_disadvantage",
                header: "Stealth Disadvantage",
            }
        ],
        [],
    );

    const table = useMantineReactTable({
        columns,
        data,
    });

    return <MantineReactTable table={table} enableTopToolbar={false} />;
};

export default ArmorTable;