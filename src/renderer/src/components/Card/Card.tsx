import { Card, Image, Text, Button, Group } from '@mantine/core';
import { useEffect, useState } from 'react';

function PackCard({ handleDownload, pack, isOffline }) {
    const [image, setImage] = useState(null);

    useEffect(() => {
        const getImage = async () => {
            const dynamicImage = await import(`./../../assets/packs/${pack.image}.jpg`);

            if (dynamicImage) {
                setImage(dynamicImage.default);
            }
        }

        getImage().catch(console.error);
    }, []);

    return (
        <Card shadow="sm" padding="lg" radius="md" withBorder>
            <Card.Section className='h-[160px] overflow-hidden'>
                {
                    image !== null && (
                        <Image
                            src={image}
                            width={160}
                            className='w-fit overflow-hidden select-none'
                            alt={pack.name}
                        />
                    )
                }
            </Card.Section>

            <Group justify="space-between" mt="md" mb="xs">
                <Text fw={500}>{pack.name}</Text>
            </Group>

            <Text size="sm" c="dimmed">
                {pack.description}
            </Text>

            <Button color="blue" onClick={handleDownload} disabled={pack.downloaded} fullWidth mt="md" radius="md">
                {
                    isOffline ? 'You are offline' : pack.downloaded ? 'You own this pack' : 'Download'
                }
            </Button>
        </Card>
    )
}

export default PackCard