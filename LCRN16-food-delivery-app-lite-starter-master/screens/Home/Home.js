import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  FlatList,
} from "react-native";

import { FilterModal } from "../";
import { FONTS, SIZES, COLORS, icons, dummyData } from "../../constants";
import { HorizontalFoodCard, VerticalFoodCard } from "../../components";
import { useNavigation } from "@react-navigation/native";

const Section = ({ title, onPress, children }) => {
  return (
    <View>
      <View
        style={{
          flexDirection: "row",
          marginHorizontal: SIZES.padding,
          marginTop: 30,
          marginBottom: 30,
        }}
      >
        <Text style={{ flex: 1, ...FONTS.h3 }}>{title}</Text>
      </View>

      <TouchableOpacity onPress={onPress}>
        <Text style={{ color: COLORS.primary, ...FONTS.body3 }}>Show All</Text>
      </TouchableOpacity>
      {children}
    </View>
  );
};

const Home = () => {
  const [selectedCategoryId, setSelectedCategoryId] = React.useState(1);
  const navigation = useNavigation();
  const [selectedMenuType, setSelectedMenuType] = React.useState(1);
  const [popular, setPopular] = React.useState([]);
  const [recommends, setRecommends] = React.useState([]);
  const [menuList, setMenuList] = React.useState([]);

  const [showFilterModel, setShowFilterModel] = React.useState(false);

  React.useEffect(() => {
    handleChangeCategory(selectedCategoryId, selectedMenuType);
  }, []);

  function handleChangeCategory(categoryId, menuTypeId) {
    // Retrieve the popular menu
    let selectedPopular = dummyData.menu.find((a) => a.name == "Popular");

    // Retrieve the recommended menu
    let selectedRecommend = dummyData.menu.find((a) => a.name == "Recommended");

    // find the menu based on the menuTypeId
    let selectedMenu = dummyData.menu.find((a) => a.id == menuTypeId);

    // Set the recommended menu based on the categoryId
    setRecommends(
      selectedRecommend?.list.filter((a) => a.categories.includes(categoryId))
    );

    // Set the popular menu based on the categoryId
    setPopular(
      selectedPopular?.list.filter((a) => a.categories.includes(categoryId))
    );

    // set the menu based on the categoryId
    setMenuList(
      selectedMenu?.list.filter((a) => a.categories.includes(categoryId))
    );
  }

  function renderSearch() {
    return (
      <View
        style={{
          flexDirection: "row",
          height: 40,
          alignItems: "center",
          marginHorizontal: SIZES.padding,
          marginVertical: SIZES.base,
          paddingHorizontal: SIZES.radius,
          borderRadius: SIZES.radius,
          backgroundColor: COLORS.lightGray2,
        }}
      >
        <Image
          source={icons.search}
          style={{
            height: 20,
            width: 20,
            tintColor: COLORS.black,
          }}
        />

        <TextInput
          style={{
            flex: 1,
            marginLeft: SIZES.radius,
            ...FONTS.body3,
          }}
          placeholder="search food..."
        />

        <TouchableOpacity onPress={() => setShowFilterModel(true)}>
          <Image
            source={icons.filter}
            style={{
              height: 20,
              width: 20,
              tintColor: COLORS.black,
            }}
          />
        </TouchableOpacity>
      </View>
    );
  }

  function renderMenuTypes() {
    return (
      <FlatList
        horizontal
        data={dummyData}
        keyExtractor={`${item.id}`}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          marginTop: 30,
          marginBottom: 20,
        }}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            style={{
              marginLeft: SIZES.padding,
              marginRight:
                index == dummyData.menu.length - 1 ? SIZES.padding : 0,
            }}
            onPress={() => {
              setSelectedMenuType(item.id);
              handleChangeCategory(selectedCategoryId, item.id);
            }}
          >
            <Text
              style={{
                color:
                  selectedMenuType == item.id ? COLORS.primary : COLORS.black,
                ...FONTS.h3,
              }}
            >
              {item.name}
            </Text>
          </TouchableOpacity>
        )}
      />
    );
  }

  function renderRecommendedSection() {
    return (
      <Section
        title="Recommended"
        onPress={() => console.log("Show all recommended")}
      >
        <FlatList
          data={recommends}
          keyExtractor={(item) => `${item.id}`}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={({ item, index }) => (
            <HorizontalFoodCard
              containerStyle={{
                height: 180,
                width: SIZES.width * 0.85,
                marginLeft: index == 0 ? SIZES.padding : 18,
                marginRight: index == recommends.length - 1 ? SIZES.padding : 0,
                paddingRight: SIZES.radius,
                alignItems: "center",
              }}
              imageStyle={{
                marginTop: 35,
                height: 150,
                width: 150,
              }}
              item={item}
              onPress={() =>
                navigation.navigate("FoodDetail", { item: foodItem })
              }
            />
          )}
        />
      </Section>
    );
  }

  function renderPopularSection() {
    return (
      <Section
        title="Popular Near You"
        onPress={() => console.log("Show all popular items")}
      >
        <FlatList
          data={popular}
          keyExtractor={(item) => `${item.id}`}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={({ item, index }) => (
            <VerticalFoodCard
              containerStyle={{
                marginLeft: index == 0 ? SIZES.padding : 18,
                marginRight: index == popular.length - 1 ? SIZES.padding : 0,
              }}
              item={item}
              onPress={() => console.log("Vertical Food Card")}
            />
          )}
        />
      </Section>
    );
  }

  function renderFoodCategories() {
    return (
      <FlatList
        data={dummyData.categories}
        keyExtractor={(item) => `${item.id}`}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            style={{
              flexDirection: "row",
              height: 55,
              marginTop: SIZES.padding,
              marginLeft: index == 0 ? SIZES.padding : SIZES.radius,
              marginRight:
                index == dummyData.categories.length - 1 ? SIZES.padding : 0,
              paddingHorizontal: 8,
              borderRadius: SIZES.radius,
              backgroundColor:
                selectedCategoryId == item.id
                  ? COLORS.primary
                  : COLORS.lightGray2,
            }}
            onPress={() => {
              setSelectedCategoryId(item.id);
              handleChangeCategory(item.id, selectedMenuType);
            }}
          >
            <Image
              source={item.icon}
              style={{
                marginTop: 5,
                height: 50,
                width: 50,
              }}
            />

            <Text
              style={{
                alignSelf: "center",
                marginRight: SIZES.base,
                color:
                  selectedCategoryId == item.id
                    ? COLORS.white
                    : COLORS.darkGray,
                ...FONTS.h3,
              }}
            >
              {item.name}
            </Text>
          </TouchableOpacity>
        )}
      />
    );
  }

  function renderDeliveryTo() {
    return (
      <View
        style={{
          marginTop: SIZES.padding,
          marginHorizontal: SIZES.padding,
        }}
      >
        <Text
          style={{
            color: COLORS.primary,
            ...FONTS.body3,
          }}
        >
          DELIVER TO
        </Text>

        <TouchableOpacity
          style={{
            flexDirection: "row",
            marginTop: SIZES.base,
            alignItems: "center",
          }}
        >
          <Text style={{ ...FONTS.h3 }}>{dummyData?.myProfile?.address}</Text>
          <Image
            source={icons.down_arrow}
            style={{
              marginLeft: SIZES.base,
              height: 20,
              width: 20,
            }}
          />
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View
      style={{
        flex: 1,
      }}
    >
      {/* Search*/}
      {renderSearch()}

      {showFilterModel && (
        <FilterModal
          isVisible={showFilterModel}
          onClose={() => setShowFilterModel(false)}
        />
      )}
      {/* List*/}

      <FlatList
        data={menuList}
        keyExtractor={(item) => `${item.id}`}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <View>
            {/* Delivery To*/}
            {renderDeliveryTo()}

            {/*Food Categories*/}
            {renderFoodCategories()}

            {/* Popular*/}
            {renderPopularSection()}

            {/* Recommended*/}
            {renderRecommendedSection()}

            {/* Menu Type*/}
            {renderMenuTypes()}
          </View>
        }
        renderItem={({ item, index }) => {
          return (
            <HorizontalFoodCard
              containerStyle={{
                height: 130,
                alignItems: "center",
                marginHorizontal: SIZES.padding,
                marginBottom: SIZES.radius,
              }}
              imageStyle={{
                marginTop: 20,
                height: 110,
                width: 110,
              }}
              item={item}
              onPress={() => console.log("HorizontalFoodCard")}
            />
          );
        }}
        ListFooterComponent={<View style={{ height: 200 }} />}
      />
    </View>
  );
};

export default Home;
