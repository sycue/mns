import { useFetchOwnedNames } from "hooks/useName";
import { Box, Container, Grid } from "@chakra-ui/react";
import OwnedItem from "views/Name/OwnedItem";
import Loading from "components/Loading";

export default function OwnedPage() {
  const { data, loading } = useFetchOwnedNames();

  return (
    <Box minHeight="md">{loading ? <Loading /> : <NameList data={data} />}</Box>
  );
}

function NameList({ data }) {
  return (
    <Container maxW={"6xl"} py={10}>
      <Grid templateColumns="repeat(3, 1fr)" gap={3}>
        {data.map(item => (
          <OwnedItem key={item.tokenId} item={item} />
        ))}
      </Grid>
    </Container>
  );
}
