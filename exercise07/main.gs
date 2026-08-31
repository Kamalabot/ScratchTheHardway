costumes "assets/story-Z.svg";

# 1. Declare sprite-level variables
var formatter = "";

# 2. Define procedure with space-separated arguments
proc say_formatted a, b, c, d {
  say $a & " " & $b & " " & $c & " " & $d;
  wait 2;
}

onflag {
  # print(formatter.format(1, 2, 3, 4))
  say_formatted "1", "2", "3", "4";

  # print(formatter.format("one", "two", "three", "four"))
  say_formatted "one", "two", "three", "four";

  # print(formatter.format(True, False, False, True))
  say_formatted "true", "false", "false", "true";

  # print(formatter.format(formatter, formatter, formatter, formatter))
  formatter = "{} {} {} {}";
  say_formatted formatter, formatter, formatter, formatter,;

  # Multiline text formatting
  say_formatted "Try your", "Own text here", "Maybe a poem", "Or a song about fear";

  say_formatted "Next Trial", "More Formet", "Maybe a poem", "Or a song about fear";
}