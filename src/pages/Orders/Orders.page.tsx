import React from "react";
import { collection } from "firebase/firestore";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { Link } from "react-router-dom";
import MainLayout from "../../layouts/Main/Main.layout";
import { firebaseInstance } from "../../services/firebase/firebase.service";

const OrdersPage = () => {
  // const [
  //   items,
  //   // loading,
  //   // error,
  // ] = useCollectionData(
  //   collection(firebaseInstance.getFirestore(), "/orders")
  // )
  return (
    <MainLayout>
      <div>Orders</div>
      <Link to="/orders/1"> link </Link>
    </MainLayout>
  );
}

export default OrdersPage;