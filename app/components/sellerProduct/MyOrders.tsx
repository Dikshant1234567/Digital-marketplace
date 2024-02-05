import cx from 'clsx';
import { useEffect, useState } from 'react';
import { Table, ScrollArea, Button, Flex } from '@mantine/core';
import classes from './MyOrders.module.css';
import axios from "axios";
import Loader from "../common/Loader";

export function MyOrders({setActive,setProductId}:any) {
  const [scrolled, setScrolled] = useState(false);
  const [orders,setAllOrders]=useState([])
  const[isLoading,setIsLoading]=useState(true)

  useEffect(()=>{
    setProductId(null)
    axios
    .get("http://localhost:5050/product/seller/65b0f79a8b658b50673a6b20").then((e)=>{setAllOrders(e.data.data)
  setIsLoading(false)
  })

  },[])

  
  const rows = orders?.map((row:any) => (
    <Table.Tr key={Math.random()}>
      <Table.Td>{row._id}</Table.Td>
      <Table.Td>{row.productName}</Table.Td>
      <Table.Td>{row.category}</Table.Td>
      <Table.Td pr={20}><Flex align={"center"} justify={"space-between"}>{row.price} <Button onClick={()=>{setActive(1)
      setProductId(row._id)
      }}>Edit</Button></Flex></Table.Td>
    </Table.Tr>
  ));

  return (
    <>

{!isLoading?  <ScrollArea h="90vh" onScrollPositionChange={({ y }) => setScrolled(y !== 0)}>
      <Table miw={700} >
        <Table.Thead className={cx(classes.header, { [classes.scrolled]: scrolled })}>
          <Table.Tr>
            <Table.Th>Id</Table.Th>
            <Table.Th>Name</Table.Th>
            <Table.Th>Category</Table.Th>
            <Table.Th>Price</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{orders.length>0 ? rows : "No orders"}</Table.Tbody>
      </Table>
    </ScrollArea> : <Loader/>
    }
    </>
  );
}