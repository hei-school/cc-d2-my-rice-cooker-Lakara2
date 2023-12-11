using System;

public class RiceCooker
{
    private double rice;
    private double riceTest;
    private double water;
    private double waterTest;
    private bool isStartButtonPressed;
    private bool isCooking;
    private bool isWarm;
    private double temperature;

    public RiceCooker()
    {
        rice = 0;
        riceTest = 0;
        water = 0;
        waterTest = 0;
        isStartButtonPressed = false;
        isCooking = false;
        isWarm = false;
        temperature = 0;
    }

    private double AskUserInput(string question)
    {
        Console.Write(question);
        double userInput;
        while (!double.TryParse(Console.ReadLine(), out userInput))
        {
            Console.WriteLine("Invalid input. Please enter a valid number.");
            Console.Write(question);
        }
        return userInput;
    }

    private void AddRiceFromUserInput()
    {
        double newRiceAmount = AskUserInput("Enter the amount of rice in grams: ");
        rice += newRiceAmount;
        Console.WriteLine($"You now have {rice} grams of rice.");
    }

    private void AddWaterFromUserInput()
    {
        double additionalWater = AskUserInput("Enter the amount of water in litres: ");
        water += additionalWater;
        Console.WriteLine($"You now have {water} litres of water.");
    }

    private void RemoveWaterFromUserInput()
    {
        if (water > 0)
        {
            double waterToRemove = AskUserInput("Enter the amount of water in litres to remove: ");
            if (waterToRemove <= water)
            {
                water -= waterToRemove;
                Console.WriteLine($"You now have {water} litres of water.");
            }
            else
            {
                Console.WriteLine("Cannot remove more water than available.");
            }
        }
        else
        {
            Console.WriteLine("There's no water to remove.");
        }
    }

    private void RemoveRiceFromUserInput()
    {
        if (rice > 0 && water == 0)
        {
            double riceToRemove = AskUserInput("Enter the amount of rice in grams to remove: ");
            if (riceToRemove <= rice)
            {
                rice -= riceToRemove;
                Console.WriteLine($"You now have {rice} grams of rice.");
            }
            else
            {
                Console.WriteLine("Cannot remove more rice than available.");
            }
        }
        else
        {
            Console.WriteLine("Cannot remove rice after adding water.");
        }
    }

    private void CalculateWaterFromRice()
    {
        const double waterRatio = 2;
        waterTest = rice * waterRatio / 1000;
        Console.WriteLine($"For {rice} g of rice, you'll need {waterTest} litres of water.");
    }

    private void CalculateRiceFromWater()
    {
        const double riceRatio = 0.5;
        riceTest = water * riceRatio * 1000;
        Console.WriteLine($"With {water} litres of water, you'll have approximately {riceTest} grams of rice.");
    }

    private void GetWaterAmount()
    {
        Console.WriteLine($"\nCurrent water amount: {water} litres");
    }

    private void GetRiceAmount()
    {
        Console.WriteLine($"\nCurrent rice amount: {rice} grams");
    }

    private void GetTemperature()
    {
        Console.WriteLine($"\nCurrent rice cooker temperature: {temperature} °C");
    }

    public void TurnOnPower()
    {
        Console.WriteLine("\nPlease turn on the power.");
        Console.Write("\nPress 'Y' to turn on the power: ");
        string answer = Console.ReadLine();
        switch (answer.ToUpper())
        {
            case "Y":
                isStartButtonPressed = true;
                Console.WriteLine("\nPower is on.");
                ShowMenu();
                break;
            default:
                Console.WriteLine("\nPower was not activated.");
                break;
        }
    }

    private void ShowMenu()
    {
        Console.WriteLine("\nMenu:");
        Console.WriteLine("1. Add rice");
        Console.WriteLine("2. Add water");
        Console.WriteLine("3. Remove water");
        Console.WriteLine("4. Remove rice");
        Console.WriteLine("5. See water quantity");
        Console.WriteLine("6. See rice quantity");
        Console.WriteLine("7. See temperature");
        Console.WriteLine("8. Cook everything");
        Console.WriteLine("9. Quit");

        int choice = (int)AskUserInput("Choose an option: ");

        switch (choice)
        {
            case 1:
                AddRiceFromUserInput();
                CalculateWaterFromRice();
                ShowMenu();
                break;
            case 2:
                AddWaterFromUserInput();
                CalculateRiceFromWater();
                ShowMenu();
                break;
            case 3:
                RemoveWaterFromUserInput();
                ShowMenu();
                break;
            case 4:
                RemoveRiceFromUserInput();
                ShowMenu();
                break;
            case 5:
                GetWaterAmount();
                ShowMenu();
                break;
            case 6:
                GetRiceAmount();
                ShowMenu();
                break;
            case 7:
                GetTemperature();
                ShowMenu();
                break;
            case 8:
                StartCooking();
                break;
            case 9:
                Console.WriteLine("Exiting program.");
                break;
            default:
                Console.WriteLine("Invalid option.");
                ShowMenu();
                break;
        }
    }

    private bool CheckWaterAmount()
    {
        if (rice == 0 || water == 0)
        {
            Console.WriteLine("Add rice and water to start cooking.");
            return false;
        }

        return true;
    }

    private void StartCooking()
    {
        if (!isStartButtonPressed)
        {
            Console.WriteLine("Check the start button to begin cooking.");
            return;
        }

        if (isCooking)
        {
            Console.WriteLine("Cooking process is already ongoing.");
            return;
        }

        bool waterCheck = CheckWaterAmount();
        if (!waterCheck)
        {
            Console.WriteLine("Cannot start cooking: Check water and rice quantity.");
            ShowMenu();
            return;
        }

        isCooking = true;
        Console.WriteLine("Cooking...");
        System.Threading.Thread.Sleep(5000); // Simulating cooking time
        isCooking = false;
        KeepWarm();
        Console.WriteLine("Rice is ready!");
    }

    private void KeepWarm()
    {
        isWarm = true;
        Console.WriteLine("Keeping warm...");
    }

    public void StopCooking()
    {
        isCooking = false;
        isWarm = false;
        Console.WriteLine("Cooking stopped.");
    }

    private bool CheckCommonErrors()
    {
        if (rice > 0 && water == 0)
        {
            Console.WriteLine("Error: Add sufficient water.");
            return true;
        }
        if (!isCooking && rice == 0 && water == 0)
        {
            Console.WriteLine("Error: Cooker is empty. Add rice and water.");
            return true;
        }
        if (!isCooking && rice > 0 && water == 0)
        {
            Console.WriteLine("Error: Add water to start cooking.");
            return true;
        }
        if (!isCooking && rice == 0 && water > 0)
        {
            Console.WriteLine("Error: Add rice to start cooking.");
            return true;
        }
        return false;
    }
}