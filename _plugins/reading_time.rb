# Reading time calculator plugin for Jekyll
module Jekyll
  module ReadingTimeFilter
    def reading_time(input)
      words_per_minute = 200

      # Strip HTML tags and count words
      words = input.to_s.gsub(/<\/?[^>]*>/, "").split.size

      # Calculate reading time
      minutes = (words / words_per_minute.to_f).ceil

      # Return reading time
      minutes < 1 ? 1 : minutes
    end
  end
end

Liquid::Template.register_filter(Jekyll::ReadingTimeFilter)