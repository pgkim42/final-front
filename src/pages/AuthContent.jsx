import React, { createContext, useState, useContext, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({
    name: null,
    userType: null,
    email: null,
    userId: null,
    companyCode: null,
    companyType: null,
    companyName: null,
    ceoName: null,
    companyAddress: null,
  });

  useEffect(() => {
    const name = localStorage.getItem("name");
    const userType = localStorage.getItem("type");
    const email = localStorage.getItem("email");
    const userId = localStorage.getItem("userCode") || localStorage.getItem("userId");
    const companyCode = localStorage.getItem("companyCode");
    const companyType = localStorage.getItem("companyType");
    const companyName = localStorage.getItem("companyName");
    const ceoName = localStorage.getItem("ceoName");
    const companyAddress = localStorage.getItem("companyAddress");

    setAuthState({
      name: name || null,
      userType: userType || null,
      email: email || null,
      userId: userId || null,
      companyCode: userType === "company" ? companyCode || null : null,
      companyType: userType === "company" ? companyType || null : null,
      companyName: userType === "company" ? companyName || null : null,
      ceoName: userType === "company" ? ceoName || null : null,
      companyAddress: userType === "company" ? companyAddress || null : null,
    });

    console.log("AuthContext 초기화 완료:", {
      name,
      userType,
      email,
      userId,
      companyCode,
      companyType,
      companyName,
      ceoName,
      companyAddress,
    });
  }, []);

  const login = (name, userType, email, userId, token, companyData = null) => {
    localStorage.setItem("name", name);
    localStorage.setItem("type", userType);
    localStorage.setItem("email", email);

    // 일반 로그인에서만 메시지 출력
    if (userType !== "kakao" && userType !== "naver") {
      alert(`${name} 님이 로그인 하셨습니다.`);
    }

    if (userType === "kakao" || userType === "naver") {
      localStorage.setItem("userCode", userId);
    } else {
      localStorage.setItem("userId", userId);
    }
    localStorage.setItem("token", token);

    if (userType === "company" && companyData) {
      localStorage.setItem("companyCode", companyData.companyCode || "");
      localStorage.setItem("companyType", companyData.companyType || "");
      localStorage.setItem("companyName", companyData.companyName || "");
      localStorage.setItem("ceoName", companyData.ceoName || "");
      localStorage.setItem("companyAddress", companyData.companyAddress || "");
    }

    setAuthState({
      name,
      userType,
      email,
      userId,
      companyCode: userType === "company" ? companyData?.companyCode || null : null,
      companyType: userType === "company" ? companyData?.companyType || null : null,
      companyName: userType === "company" ? companyData?.companyName || null : null,
      ceoName: userType === "company" ? companyData?.ceoName || null : null,
      companyAddress: userType === "company" ? companyData?.companyAddress || null : null,
    });
  };

  const logout = () => {
    const { name } = authState; 
    alert(`${name}님이 로그아웃 하셨습니다.`);
    localStorage.clear();
    setAuthState({
      name: null,
      userType: null,
      email: null,
      userId: null,
      companyCode: null,
      companyType: null,
      companyName: null,
      ceoName: null,
      companyAddress: null,
    });
  };

  return (
    <AuthContext.Provider value={{ ...authState, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};


export const useAuth = () => useContext(AuthContext);
