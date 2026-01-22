package com.quiz.tests;

import java.time.Duration;
import java.util.List;

import org.openqa.selenium.By;
import org.openqa.selenium.JavascriptExecutor;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;

import io.github.bonigarcia.wdm.WebDriverManager;

public class QuizAutomationTest {

	public static void main(String[] args) throws InterruptedException {

		// Setup ChromeDriver automatically
		WebDriverManager.chromedriver().setup();
		WebDriver driver = new ChromeDriver();

		driver.manage().timeouts().implicitlyWait(Duration.ofSeconds(10));
		driver.manage().window().maximize();

		JavascriptExecutor js = (JavascriptExecutor) driver;

		// 1. Verify Landing Page
		driver.get("http://localhost:5500/index.html"); // Update if needed
		System.out.println("URL: " + driver.getCurrentUrl());
		System.out.println("Title: " + driver.getTitle());

		// 2. Start Quiz
		WebElement startBtn = driver.findElement(By.xpath("//button[text()='Start Quiz']"));
		js.executeScript("arguments[0].click();", startBtn);

		WebElement firstQuestion = driver.findElement(By.id("question"));
		System.out.println("First Question: " + firstQuestion.getText());

		// 3. Question Navigation & Answer Selection
		int totalQuestions = 3;

		for (int i = 0; i < totalQuestions; i++) {

			WebElement question = driver.findElement(By.id("question"));
			System.out.println("\nQuestion " + (i + 1) + ": " + question.getText());

			List<WebElement> options = driver.findElements(By.cssSelector("#options button"));

			// Select FIRST option using JavaScript
			WebElement option = options.get(0);
			js.executeScript("arguments[0].click();", option);

			// Print selected option text
			System.out.println("Selected Option: " + option.getText());

			// Click Next
			WebElement nextBtn = driver.findElement(By.xpath("//button[text()='Next']"));
			js.executeScript("arguments[0].click();", nextBtn);

			Thread.sleep(1500); // Wait before next question
		}

		// 5. Score Calculation Verification
		WebElement score = driver.findElement(By.id("score"));
		WebElement analysis = driver.findElement(By.id("analysis"));

		System.out.println("\nFinal Score: " + score.getText());
		System.out.println("Performance: " + analysis.getText());

		// Keep browser open for observation
		Thread.sleep(10000);

		driver.quit();
	}
}
