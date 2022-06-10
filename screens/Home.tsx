import React, { FunctionComponent, useEffect, useState } from "react";
import { FlatList, SafeAreaView, View } from "react-native";
import AddNewPlant from "../components/AddNewPlant/AddNewPlant";
import Plant from "../components/Plant/Plant";

interface Plant {
  id: number;
  name: string;
}

const Home: FunctionComponent = () => {
  const [dataSource, setDataSource] = useState<Plant[]>();

  useEffect(() => {
    const items = Array.apply(null, Array(4)).map((item, index) => {
      return {
        id: index,
        name: `kwiatek_${index}`,
      };
    });
    setDataSource(items);
  }, []);
  return (
    <>
      <View style={{ height: "100%", width: "100%", padding: 5 }}>
        {dataSource ? 
        <SafeAreaView>
          {dataSource.length % 2 === 0 ? (
            <>
              <FlatList
                data={dataSource}
                renderItem={({ item }) => (
                  <Plant
                    name={item.name}
                    imgSrc={require("../assets/flower.jpg")}
                  />
                )}
                numColumns={2}
                keyExtractor={(item, index) => index.toString()}
              />
              <AddNewPlant />
            </>
          ) : (
            <FlatList
              data={dataSource}
              renderItem={({ item, index }) => {
                if (index + 1 >= dataSource.length) {
                  return (
                    <>
                      <Plant
                        name={item.name}
                        imgSrc={require("../assets/flower.jpg")}
                      />
                      <AddNewPlant />
                    </>
                  );
                }
                return (
                  <Plant
                    name={item.name}
                    imgSrc={require("../assets/flower.jpg")}
                  />
                );
              }}
              numColumns={2}
              keyExtractor={(item, index) => index.toString()}
            />
          )}
        </SafeAreaView>
        : null}
      </View>
    </>
  );
};

export default Home;