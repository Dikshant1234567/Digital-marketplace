"use client";
import {
  Box,
  Button,
  Group,
  Text,
  Title,
  useComputedColorScheme,
  useMantineColorScheme,
} from "@mantine/core";
import React, { useEffect, useState, useRef } from "react";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { removeCart } from "../redux/slices/cart-slice";
import cx from "clsx";
import { IconTrash } from "@tabler/icons-react";
import {
  useHover,
  useClickOutside,
  useFocusTrap,
  useMergedRef,
} from "@mantine/hooks";
import Image from "next/image";
import cartImage from "../assets/hippo-empty-cart.png";
import { useRouter } from "next/navigation";
function Cart() {
  const item = useAppSelector((state) => state.cartReducer.product);
  const dispatch = useAppDispatch();
  const [cartPrice, setCartPrice] = useState<number>();
  const router = useRouter();
  console.log(item.map((i) => i.price));
  const { setColorScheme, clearColorScheme, colorScheme } =
    useMantineColorScheme();


    // backendUrl url
    const backendUrl = 'https://digital-marketplace-backend.onrender.com'


  useEffect(() => {
    let totalPrice: number = 0;
    let itemPrice: number[] = item.map((i) => i.price);

    if (item.length === 0) {
      return;
    }
    let price = itemPrice.reduce((x, y) => {
      return x + y;
    });
    // console.log(totalPrice, typeof totalPrice);
    totalPrice += price;
    setCartPrice(totalPrice);
  }, [item]);

  return (
    <>
      {item.length === 0 ? (
        <Box style={{ overflow: "hidden", width: "100%", textAlign: "center" }}>
          <Image
            src={cartImage}
            style={{
              width: "100%",
              height: "100%",
              mixBlendMode: "multiply",
              // opacity: ".7",
            }}
            alt="emptyCartImage"
          />
          <Title m={"auto"}>Cart is empty</Title>
        </Box>
      ) : (
        <Box style={{ position: "relative" }}>
          <Box
            style={{
              position: "sticky",
              zIndex: "9999",
              top: "0",
              left: "0",
              background: `${
                colorScheme === "dark" ? "#00000014" : "#f5f5dc59"
              }`,
              width: "100%",
              height: "5rem",
              overflow: "hidden",
              paddingLeft: ".5rem",
              paddingTop: ".5rem",
              color: `${colorScheme === "dark" ? "white" : "black"}`,
            }}
          >
            <Title order={4}>Total Product : ({item.length}) </Title>
            <Title order={5} fw={"400"} my={"xs"}>
              Price : ${cartPrice}
            </Title>
          </Box>
          <hr style={{ opacity: ".01" }} />

          <Box h={"80vh"}>
            {item.map((data, i) => {
              const {
                productName,
                productImage,
                productDescription,
                price,
                _id,
              } = data;
              const imgurl = productImage.map((i) => i.name);
              return (
                <Box key={i} mb={"xl"} style={{ overflowY: "hidden" }}>
                  <img
                    src={`${backendUrl}/uploads/${imgurl}`}
                    alt="productImage"
                    width={"full"}
                    height={200}
                    style={{
                      overflow: "hidden",
                      width: "100%",
                      objectFit: "cover",
                      cursor: "pointer",
                    }}
                    onClick={() => router.push(`/productinfo/${_id}`)}
                  />
                  <Group justify="space-between">
                    <Box>
                      <Title
                        style={{ textTransform: "capitalize" }}
                        my={5}
                        order={3}
                      >
                        {data.productName}
                      </Title>
                      <Text fw={"lighter"}>
                        $ {price} - {productDescription.substring(0, 15)}...
                      </Text>
                    </Box>
                    <Button
                      onClick={() => dispatch(removeCart(_id))}
                      className={cx(`hover:bg-red-800 hover:text-white`)}
                    >
                      <IconTrash />
                    </Button>
                  </Group>
                  <hr style={{ opacity: ".5" }} />
                </Box>
              );
            })}
          </Box>
        </Box>
      )}
    </>
  );
}

export default Cart;
