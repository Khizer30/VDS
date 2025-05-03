//
import { responseObj } from "@lib/objects";
import type { ResponseInterface } from "@lib/interface";

// Validate
function validate(type: string, value: string | number): ResponseInterface
{
  const res: ResponseInterface = responseObj;

  if (type === "numberPlate")
  {
    value = value.toString();

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
  else if (type === "makeID")
  {
    value = +value;

    if (value !== 0)
    {
      res.success = true;
      res.message = "";
    }
    else
    {
      res.success = false;
      res.message = "Kindly, Select The Make & Model of the Vehicle!";
    }
  }
  else if (type === "colourID")
  {
    value = +value;

    if (value !== 0)
    {
      res.success = true;
      res.message = "";
    }
    else
    {
      res.success = false;
      res.message = "Kindly, Select The Colour of the Vehicle!";
    }
  }
  else if (type === "email")
  {
    value = value.toString();

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
    value = value.toString();

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
    value = value.toString();

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