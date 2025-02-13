//
import { responseObj } from "@lib/objects";
import type { ResponseInterface } from "@lib/interface";

// Validate
function validate(type: string, value: string): ResponseInterface
{
  const res: ResponseInterface = responseObj;

  if (type === "numberPlate")
  {
    if (value !== "")
    {
      if (value.length > 0 && value.length <= 100)
      {
        res.success = true;
        res.message = "";
      }
      else
      {
        res.success = false;
        res.message = "Number Plate Must Be Between 1 & 100 Characters!";
      }
    }
    else
    {
      res.success = false;
      res.message = "Kindly, Enter The Number Plate No.!";
    }
  }
  else if (type === "make")
  {
    if (value !== "")
    {
      if (value.length > 0 && value.length <= 100)
      {
        res.success = true;
        res.message = "";
      }
      else
      {
        res.success = false;
        res.message = "Make & Model Must Be Between 1 & 100 Characters!";
      }
    }
    else
    {
      res.success = false;
      res.message = "Kindly, Select The Make & Model!";
    }
  }
  else if (type === "colour")
  {
    if (value !== "")
    {
      if (value.length > 0 && value.length <= 100)
      {
        res.success = true;
        res.message = "";
      }
      else
      {
        res.success = false;
        res.message = "Colour Must Be Between 1 & 100 Characters!";
      }
    }
    else
    {
      res.success = false;
      res.message = "Kindly, Select The Colour of the Vehicle!";
    }
  }
  else if (type === "email")
  {
    if (value !== "")
    {
      if (value.length > 0 && value.length <= 100)
      {
        res.success = true;
        res.message = "";
      }
      else
      {
        res.success = false;
        res.message = "Email Must Be Between 1 & 100 Characters!";
      }
    }
    else
    {
      res.success = false;
      res.message = "Kindly, Enter The Email!";
    }
  }
  else if (type === "name")
  {
    if (value !== "")
    {
      if (value.length > 0 && value.length <= 100)
      {
        res.success = true;
        res.message = "";
      }
      else
      {
        res.success = false;
        res.message = "Name Must Be Between 1 & 100 Characters!";
      }
    }
    else
    {
      res.success = false;
      res.message = "Kindly, Enter The Name!";
    }
  }
  else if (type === "password")
  {
    if (value !== "")
    {
      if (value.length > 0 && value.length <= 100)
      {
        res.success = true;
        res.message = "";
      }
      else
      {
        res.success = false;
        res.message = "Password Must Be Between 1 & 100 Characters!";
      }
    }
    else
    {
      res.success = false;
      res.message = "Kindly, Enter The Password!";
    }
  }

  return res;
};

export default validate;