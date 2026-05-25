import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home } from "@/pages/Home";
import { Tools } from "@/pages/Tools";
import { Dashboard } from "@/pages/Dashboard";
import { Login } from "@/pages/Login";
import { Signup } from "@/pages/Signup";
import { BMICalculator } from "@/pages/tools/BMICalculator";
import { CurrencyConverter } from "@/pages/tools/CurrencyConverter";
import { PasswordGenerator } from "@/pages/tools/PasswordGenerator";
import { JsonFormatter } from "@/pages/tools/JsonFormatter";
import { UrlEncoder } from "@/pages/tools/UrlEncoder";
import { EmailValidator } from "@/pages/tools/EmailValidator";
import { ColorPicker } from "@/pages/tools/ColorPicker";
import { TimestampConverter } from "@/pages/tools/TimestampConverter";
import { IpValidator } from "@/pages/tools/IpValidator";
import { Base64Converter } from "@/pages/tools/Base64Converter";
import { RandomNumberGenerator } from "@/pages/tools/RandomNumberGenerator";
import { HtmlFormatter } from "@/pages/tools/HtmlFormatter";
import { Navbar } from "@/components/Navbar";

export default function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/tools" element={<Tools />} />
        <Route path="/tools/bmi-calculator" element={<BMICalculator />} />
        <Route path="/tools/currency-converter" element={<CurrencyConverter />} />
        <Route path="/tools/password-generator" element={<PasswordGenerator />} />
        <Route path="/tools/json-formatter" element={<JsonFormatter />} />
        <Route path="/tools/url-encoder" element={<UrlEncoder />} />
        <Route path="/tools/email-validator" element={<EmailValidator />} />
        <Route path="/tools/color-picker" element={<ColorPicker />} />
        <Route path="/tools/timestamp-converter" element={<TimestampConverter />} />
        <Route path="/tools/ip-validator" element={<IpValidator />} />
        <Route path="/tools/base64-converter" element={<Base64Converter />} />
        <Route path="/tools/random-number-generator" element={<RandomNumberGenerator />} />
        <Route path="/tools/html-formatter" element={<HtmlFormatter />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </Router>
  );
}