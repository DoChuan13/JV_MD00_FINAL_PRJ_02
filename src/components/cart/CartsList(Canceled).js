import React, { createContext, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Space, Table, Button, Image } from "antd";
import * as picture from "../../assets/images/images";

import {
  productsState,
  usersState,
} from "../../services/redux/selectors/selectors";
import {
  formatCurrency,
  formatNumber,
} from "../../utils/valueUtils/formatValue";
import * as notifyAction from "../../services/redux/actions/notifyActions";

//import class template
import CenteredModal from "../modal/CenteredModal";
import { currencyCode, languageCode } from "../../config/valueConfig";
import { checkLoginStatus } from "../../utils/functions/commonFunctions";

export const productManager = createContext();
function CartsList() {
  let prState = useSelector(productsState);
  let usState = useSelector(usersState);

  let dispatch = useDispatch();

  const [cartList, setCartList] = useState([]);
  const [size] = useState("small");
  let totalCartAmount = useRef();
  let blankAlert = <></>;

  let loginStatus = checkLoginStatus();
  let userLog = usState.find((user) => {
    return user.id === loginStatus.id;
  });
  // console.log("Login user", userLog);

  useEffect(() => {
    let loginStatus = checkLoginStatus();
    if (usState.length !== 0) {
      let fillcartList = [];
      let userLog = usState.find((user) => {
        return user.id === loginStatus.id;
      });
      let key = 0;
      let totalAmount = 0;
      for (let i = 0; i < userLog.cart.length; i++) {
        for (let j = 0; j < prState.length; j++) {
          if (prState[j].id === userLog.cart[i].id) {
            let buyQuantity = userLog.cart[i].buyQuantity;
            fillcartList = [
              ...fillcartList,
              {
                ...prState[j],
                key: key,
                buyQuantity: buyQuantity,
                subTotal: buyQuantity * prState[j].productPrice,
              },
            ];
            totalAmount += buyQuantity * prState[j].productPrice;
            key++;
            break;
          }
        }
      }
      setCartList(fillcartList);
      totalCartAmount.current = totalAmount;
    }
  }, [prState, usState]);

  const deleteItem = (cartItem) => {
    console.log(cartItem);
    dispatch(notifyAction.deleteCartNoti(cartItem));
  };

  const paymentCart = () => {
    console.log(123123);
    dispatch(notifyAction.confirmCartNoti(totalCartAmount.current));
  };
  const columns = [
    {
      title: "ID",
      dataIndex: "key",
      key: "key",
      width: 80,
    },
    {
      title: "H??nh ???nh",
      dataIndex: "productImage",
      key: "productImage",
      render: (data) => {
        return (
          <>
            <Image width={80} src={picture[data]} />
          </>
        );
      },
    },
    {
      title: "S???n ph???m",
      dataIndex: "productName",
      key: "productName",
    },
    {
      title: "????n gi??",
      dataIndex: "productPrice",
      key: "productPrice",
      // width: 250,
      render: (data) => {
        return <>{formatCurrency(data, languageCode, currencyCode)}</>;
      },
    },
    {
      title: "S??? l?????ng",
      dataIndex: "buyQuantity",
      key: "buyQuantity",
      render: (data) => {
        return <>{formatNumber(data, languageCode)}</>;
      },
    },
    {
      title: "S??? ti???n",
      dataIndex: "subTotal",
      key: "subTotal",
      render: (data) => {
        return <>{formatCurrency(data, languageCode, currencyCode)}</>;
      },
    },
    {
      title: "H??nh ?????ng",
      key: "key",
      width: 250,
      render: (data) => {
        return (
          <Space size="small">
            <Button
              type="primary"
              danger
              size={size}
              onClick={() => deleteItem(data)}
            >
              Hu??? b???
            </Button>
          </Space>
        );
      },
    },
  ];

  //==========Render Element ==========//
  blankAlert =
    userLog.cart.length !== 0 ? (
      <></>
    ) : (
      <tr>
        <td colSpan={7}>Hi???n t???i ch??a c?? s???n ph???m n??o trong gi???</td>
      </tr>
    );

  let buyBtn;
  if (userLog.cart.length === 0) {
    buyBtn = <></>;
  } else {
    buyBtn = (
      <>
        <button
          style={{
            opacity: 0.6,
            // cursor: "not-allowed"
          }}
          className="buy_confirm"
          onClick={() => {
            paymentCart();
          }}
        >
          Thanh to??n
        </button>
      </>
    );
  }
  let contextValue = {};

  return (
    <>
      <productManager.Provider value={contextValue}>
        <div className="admin_product_manager">
          <Table
            columns={columns}
            dataSource={cartList}
            // onChange={handleChange}
          />
          <tbody>
            {blankAlert}
            <tr>
              <th colSpan={5}>T???ng gi?? tr??? ????n h??ng</th>
              <th>{totalCartAmount.current}</th>
              <th>{buyBtn}</th>
            </tr>
          </tbody>
        </div>
        <CenteredModal />
      </productManager.Provider>
    </>
  );
}
export default CartsList;
