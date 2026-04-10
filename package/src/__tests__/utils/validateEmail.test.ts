import { validateEmail } from "@/utils/validateEmail";

describe("validateEmail", () => {
  describe("valid emails", () => {
    it("accepts a standard email address", () => {
      expect(validateEmail("user@example.com")).toBeTruthy();
    });

    it("accepts emails with subdomains", () => {
      expect(validateEmail("user@mail.example.com")).toBeTruthy();
    });

    it("accepts emails with dots in the local part", () => {
      expect(validateEmail("first.last@example.com")).toBeTruthy();
    });

    it("accepts emails with plus signs in the local part", () => {
      expect(validateEmail("user+tag@example.com")).toBeTruthy();
    });

    it("accepts emails with hyphens in the domain", () => {
      expect(validateEmail("user@my-domain.com")).toBeTruthy();
    });

    it("accepts emails with country-code TLDs", () => {
      expect(validateEmail("user@example.co.nz")).toBeTruthy();
    });

    it("accepts emails with long TLDs", () => {
      expect(validateEmail("user@example.design")).toBeTruthy();
    });

    it("is case-insensitive (converts to lowercase internally)", () => {
      expect(validateEmail("USER@EXAMPLE.COM")).toBeTruthy();
    });
  });

  describe("invalid emails", () => {
    it("rejects an empty string", () => {
      expect(validateEmail("")).toBeNull();
    });

    it("rejects a string with no @ symbol", () => {
      expect(validateEmail("userexample.com")).toBeNull();
    });

    it("rejects a string with no domain", () => {
      expect(validateEmail("user@")).toBeNull();
    });

    it("rejects a string with no local part", () => {
      expect(validateEmail("@example.com")).toBeNull();
    });

    it("rejects a string with spaces", () => {
      expect(validateEmail("user name@example.com")).toBeNull();
    });

    it("rejects a plain string with no structure", () => {
      expect(validateEmail("notanemail")).toBeNull();
    });

    it("rejects an @ symbol alone", () => {
      expect(validateEmail("@")).toBeNull();
    });

    it("rejects a domain with no TLD", () => {
      expect(validateEmail("user@example")).toBeNull();
    });
  });
});
